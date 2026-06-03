package ae.gov.pod.kafka;

import ae.gov.pod.clickhouse.ClickHouseService;
import ae.gov.pod.event.ApplicationEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumerService {

    private final ClickHouseService clickHouseService;

    @KafkaListener(topics = "pod-application-events", groupId = "pod-platform-group", concurrency = "3")
    public void consumeApplicationEvent(ApplicationEvent event) {
        log.info("Received application event in consumer thread {}: {}", Thread.currentThread().getName(), event);
        
        // Record event in ClickHouse for analytics
        clickHouseService.recordApplicationEvent(event);
        
        // Additional routing would go here (e.g., sending emails)
    }
}
