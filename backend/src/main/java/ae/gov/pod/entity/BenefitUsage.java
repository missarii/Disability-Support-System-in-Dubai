package ae.gov.pod.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "benefit_usages", indexes = {
    @Index(name = "idx_usage_user", columnList = "user_id"),
    @Index(name = "idx_usage_benefit", columnList = "benefit_id"),
    @Index(name = "idx_usage_month", columnList = "usage_month")
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BenefitUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "benefit_id", nullable = false)
    private Benefit benefit;

    @Column(name = "usage_count", nullable = false)
    @Builder.Default
    private Integer usageCount = 1;

    @Column(name = "usage_month", nullable = false, length = 7)
    private String usageMonth; // Format: "2024-01"

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "amount_used")
    private Double amountUsed;

    @Column(name = "location", length = 200)
    private String location;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
