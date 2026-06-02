package ae.gov.pod.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationEvent {
    private Long applicationId;
    private String referenceNumber;
    private Long applicantId;
    private String eventType;
}
