package ae.gov.pod.repository;

import ae.gov.pod.entity.BenefitApplication;
import ae.gov.pod.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BenefitApplicationRepository extends JpaRepository<BenefitApplication, Long> {
    List<BenefitApplication> findByApplicantId(Long applicantId);
    List<BenefitApplication> findByStatus(ApplicationStatus status);
    Optional<BenefitApplication> findByReferenceNumber(String referenceNumber);
}
