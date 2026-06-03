package ae.gov.pod.config;

import ae.gov.pod.entity.Benefit;
import ae.gov.pod.entity.User;
import ae.gov.pod.enums.BenefitCategory;
import ae.gov.pod.enums.DisabilityType;
import ae.gov.pod.enums.Role;
import ae.gov.pod.repository.BenefitRepository;
import ae.gov.pod.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BenefitRepository benefitRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        log.info("Starting Data Initialization...");

        // Create Demo User if not exists
        if (!userRepository.existsByEmail("demo@pod.gov.ae")) {
            User demoUser = User.builder()
                    .email("demo@pod.gov.ae")
                    .password(passwordEncoder.encode("password123"))
                    .fullNameEn("Demo User")
                    .fullNameAr("مستخدم تجريبي")
                    .emiratesId("784-1234-5678901-2")
                    .phoneNumber("+971501234567")
                    .dateOfBirth(LocalDate.of(1990, 1, 1))
                    .disabilityType(DisabilityType.PHYSICAL)
                    .disabilityPercentage(50)
                    .monthlyIncome(5000.0)
                    .role(Role.ROLE_USER)
                    .isActive(true)
                    .isEmailVerified(true)
                    .nationality("UAE")
                    .build();
            userRepository.save(demoUser);
            log.info("Demo User created successfully.");
        }

        // Create Sanad Card Benefit if not exists
        if (benefitRepository.count() == 0) {
            Benefit sanadCard = Benefit.builder()
                    .name("Sanad Card")
                    .description("Official government ID issued by CDA. Unlocks free/discounted services, private sector benefits, and priority access.")
                    .category(BenefitCategory.MEDICAL) // Using MEDICAL as a general category for Sanad
                    .minDisabilityPercentage(0) // Available to all with a confirmed disability
                    .isActive(true)
                    .requiresMedicalReport(true)
                    .build();
            benefitRepository.save(sanadCard);
            log.info("Sanad Card benefit created successfully.");
        }

        log.info("Data Initialization complete.");
    }
}
