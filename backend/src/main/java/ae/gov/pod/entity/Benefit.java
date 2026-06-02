package ae.gov.pod.entity;

import ae.gov.pod.enums.BenefitCategory;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "benefits")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Benefit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BenefitCategory category;

    @Column(name = "monthly_limit")
    private Integer monthlyLimit;

    @Column(name = "annual_limit")
    private Integer annualLimit;

    @Column(name = "monetary_value")
    private Double monetaryValue;

    @Column(name = "min_disability_percentage")
    private Integer minDisabilityPercentage;

    @Column(name = "max_income_threshold")
    private Double maxIncomeThreshold;

    @Column(name = "eligibility_rules", columnDefinition = "TEXT")
    private String eligibilityRules;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "requires_medical_report", nullable = false)
    @Builder.Default
    private Boolean requiresMedicalReport = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "benefit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<BenefitApplication> applications = new ArrayList<>();

    @OneToMany(mappedBy = "benefit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<BenefitUsage> usages = new ArrayList<>();
}
