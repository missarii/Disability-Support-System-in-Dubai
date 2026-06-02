package ae.gov.pod.kafka;

import ae.gov.pod.event.ApplicationEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducerService {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendApplicationEvent(ApplicationEvent event) {
        log.info("Sending application event: {}", event);
        kafkaTemplate.send("pod-application-events", event.getReferenceNumber(), event);
    }
}
