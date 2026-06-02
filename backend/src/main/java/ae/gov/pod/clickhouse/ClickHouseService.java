package ae.gov.pod.clickhouse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClickHouseService {

    @Value("${clickhouse.url}")
    private String url;

    @Value("${clickhouse.username}")
    private String username;

    @Value("${clickhouse.password}")
    private String password;

    @PostConstruct
    public void init() {
        try (Connection conn = DriverManager.getConnection(url, username, password);
             Statement stmt = conn.createStatement()) {
            
            // Create analytics tables if they don't exist
            String createEventsTable = "CREATE TABLE IF NOT EXISTS system_events (" +
                    "event_id UUID," +
                    "event_type String," +
                    "user_id Int64," +
                    "reference_id String," +
                    "event_time DateTime," +
                    "metadata String" +
                    ") ENGINE = MergeTree() " +
                    "ORDER BY (event_time, event_type)";
            
            stmt.execute(createEventsTable);
            log.info("ClickHouse initialized successfully.");
            
        } catch (Exception e) {
            log.warn("Could not initialize ClickHouse (Analytics will be disabled): {}", e.getMessage());
        }
    }
    
    // Additional methods for inserting events and querying analytics...
}
