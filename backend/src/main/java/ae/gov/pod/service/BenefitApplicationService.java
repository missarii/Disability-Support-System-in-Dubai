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
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class BenefitApplicationService {

    private final BenefitApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final BenefitRepository benefitRepository;
    private final KafkaProducerService kafkaProducerService;

    // In-memory deduplication to prevent concurrent duplicate submissions
    private final Set<String> activeSubmissions =
            Collections.newSetFromMap(new ConcurrentHashMap<>());

    @Transactional
    public BenefitApplication applyForBenefit(Long userId, Long benefitId, String reason) {
        String dedupKey = "apply:" + userId + ":" + benefitId;

        if (!activeSubmissions.add(dedupKey)) {
            throw new RuntimeException("Application already in progress. Please wait.");
        }

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Benefit benefit = benefitRepository.findById(benefitId)
                    .orElseThrow(() -> new RuntimeException("Benefit not found"));

            // DB-level idempotency check
            boolean alreadyApplied = applicationRepository.findByApplicantId(userId).stream()
                    .anyMatch(app -> app.getBenefit().getId().equals(benefitId) &&
                              (app.getStatus() == ApplicationStatus.PENDING ||
                               app.getStatus() == ApplicationStatus.APPROVED));

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

            // Kafka event — non-fatal if broker unavailable
            try {
                kafkaProducerService.sendApplicationEvent(ApplicationEvent.builder()
                        .applicationId(savedApp.getId())
                        .referenceNumber(savedApp.getReferenceNumber())
                        .applicantId(userId)
                        .eventType("APPLICATION_SUBMITTED")
                        .build());
            } catch (Exception kafkaEx) {
                log.warn("Kafka event failed (non-fatal): {}", kafkaEx.getMessage());
            }

            // Async eligibility processing
            processApplicationAsync(savedApp.getId());

            return savedApp;

        } finally {
            activeSubmissions.remove(dedupKey);
        }
    }

    @Async("applicationProcessorExecutor")
    public void processApplicationAsync(Long applicationId) {
        log.info("Processing application async: {}", applicationId);
        try {
            Thread.sleep(2000); // Simulate document validation
            BenefitApplication app = applicationRepository.findById(applicationId).orElseThrow();

            if (app.getApplicant().getDisabilityPercentage() >= app.getBenefit().getMinDisabilityPercentage()) {
                app.setStatus(ApplicationStatus.UNDER_REVIEW);
            } else {
                app.setStatus(ApplicationStatus.REJECTED);
                app.setRejectionReason("Does not meet minimum disability percentage requirement");
            }
            applicationRepository.save(app);

            // Kafka status event — non-fatal
            try {
                kafkaProducerService.sendApplicationEvent(ApplicationEvent.builder()
                        .applicationId(app.getId())
                        .referenceNumber(app.getReferenceNumber())
                        .applicantId(app.getApplicant().getId())
                        .eventType("APPLICATION_STATUS_UPDATED")
                        .build());
            } catch (Exception kafkaEx) {
                log.warn("Kafka status update failed (non-fatal): {}", kafkaEx.getMessage());
            }
        } catch (Exception e) {
            log.error("Error processing application {}", applicationId, e);
        }
    }
}
