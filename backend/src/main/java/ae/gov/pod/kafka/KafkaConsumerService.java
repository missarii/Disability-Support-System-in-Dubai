package ae.gov.pod.kafka;

import ae.gov.pod.event.ApplicationEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class KafkaConsumerService {

    @KafkaListener(topics = "pod-application-events", groupId = "pod-platform-group", concurrency = "3")
    public void consumeApplicationEvent(ApplicationEvent event) {
        log.info("Received application event in consumer thread {}: {}", Thread.currentThread().getName(), event);
        
        // Here we would typically route to different services, e.g.
        // if eventType == "APPLICATION_SUBMITTED", send email
        // if eventType == "APPLICATION_APPROVED", send SMS and update ClickHouse analytics
    }
}
