package ae.gov.pod.repository;

import ae.gov.pod.entity.Benefit;
import ae.gov.pod.enums.BenefitCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BenefitRepository extends JpaRepository<Benefit, Long> {
    List<Benefit> findByCategory(BenefitCategory category);
    List<Benefit> findByIsActiveTrue();
}
