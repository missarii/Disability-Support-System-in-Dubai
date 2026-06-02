package ae.gov.pod.service;

import ae.gov.pod.entity.Benefit;
import ae.gov.pod.entity.BenefitApplication;
import ae.gov.pod.entity.User;
import ae.gov.pod.enums.ApplicationStatus;
import ae.gov.pod.event.ApplicationEvent;
import ae.gov.pod.kafka.KafkaProducerService;
import ae.gov.pod.repository.BenefitApplicationRepository;
import ae.gov.pod.repository.BenefitRepository;
import ae.gov.pod.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class BenefitApplicationService {

    private final BenefitApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final BenefitRepository benefitRepository;
    private final RedissonClient redissonClient;
    private final KafkaProducerService kafkaProducerService;

    @Transactional
    public BenefitApplication applyForBenefit(Long userId, Long benefitId, String reason) {
        String lockKey = "lock:user:apply:" + userId + ":" + benefitId;
        RLock lock = redissonClient.getLock(lockKey);

        try {
            // Wait 5 seconds for lock, hold for 10 seconds
            if (lock.tryLock(5, 10, TimeUnit.SECONDS)) {
                
                User user = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"));
                Benefit benefit = benefitRepository.findById(benefitId)
                        .orElseThrow(() -> new RuntimeException("Benefit not found"));

                // Idempotency / Duplicate check
                boolean alreadyApplied = applicationRepository.findByApplicantId(userId).stream()
                        .anyMatch(app -> app.getBenefit().getId().equals(benefitId) && 
                                  (app.getStatus() == ApplicationStatus.PENDING || app.getStatus() == ApplicationStatus.APPROVED));
                
                if (alreadyApplied) {
                    throw new RuntimeException("Already applied or have an active benefit of this type");
                }

                BenefitApplication application = BenefitApplication.builder()
                        .applicant(user)
                        .benefit(benefit)
                        .reasonForApplying(reason)
                        .status(ApplicationStatus.PENDING)
                        .build();

                BenefitApplication savedApp = applicationRepository.save(application);

                // Send Kafka Event
                kafkaProducerService.sendApplicationEvent(ApplicationEvent.builder()
                        .applicationId(savedApp.getId())
                        .referenceNumber(savedApp.getReferenceNumber())
                        .applicantId(userId)
                        .eventType("APPLICATION_SUBMITTED")
                        .build());

                // Trigger Async Processing
                processApplicationAsync(savedApp.getId());

                return savedApp;

            } else {
                throw new RuntimeException("Could not acquire lock for application submission. Please try again.");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Application submission interrupted");
        } finally {
            if (lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }

    @Async("applicationProcessorExecutor")
    public void processApplicationAsync(Long applicationId) {
        log.info("Processing application async in thread: {}", Thread.currentThread().getName());
        
        try {
            // Simulate heavy processing (document validation, eligibility checks)
            Thread.sleep(2000);
            
            BenefitApplication app = applicationRepository.findById(applicationId).orElseThrow();
            
            // Simple rule check for demonstration
            if (app.getApplicant().getDisabilityPercentage() >= app.getBenefit().getMinDisabilityPercentage()) {
                app.setStatus(ApplicationStatus.UNDER_REVIEW);
            } else {
                app.setStatus(ApplicationStatus.REJECTED);
                app.setRejectionReason("Does not meet minimum disability percentage requirement");
            }
            
            applicationRepository.save(app);
            
            // Send update event
            kafkaProducerService.sendApplicationEvent(ApplicationEvent.builder()
                    .applicationId(app.getId())
                    .referenceNumber(app.getReferenceNumber())
                    .applicantId(app.getApplicant().getId())
                    .eventType("APPLICATION_STATUS_UPDATED")
                    .build());

        } catch (Exception e) {
            log.error("Error processing application {}", applicationId, e);
        }
    }
}
