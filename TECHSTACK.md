# POD Benefit Management Platform — Tech Stack

> Detailed breakdown of every technology used in the system.

---

## Frontend

| Technology | Version | Role |
|------------|---------|------|
| **React** | 18 | UI framework (SPA) |
| **React Router DOM** | 6 | Client-side routing (`/`, `/apply`) |
| **Vite** | 8 | Build tool & dev server |
| **Tailwind CSS** | 3 | Utility-first CSS framework |
| **Lucide React** | latest | Icon library |
| **Axios** | latest | HTTP client for API calls |

### Key Pages

| Page | Route | Description |
|------|-------|-------------|
| `LandingPage.jsx` | `/` | Hero, services, eligibility, how-to-apply sections |
| `ApplicationPortal.jsx` | `/apply` | 4-step Sanad Card application form |

### Build Output
Vite builds the React SPA directly into `backend/src/main/resources/static/` so the Spring Boot server serves it as embedded static files. The `SpaController` forwards all non-API routes to `index.html` for React Router to handle.

---

## Backend

| Technology | Version | Role |
|------------|---------|------|
| **Spring Boot** | 3.3.0 | Core application framework |
| **Spring Web MVC** | 6.1.8 | REST controllers + SPA forwarding |
| **Spring Security** | 6 | JWT-based stateless authentication |
| **Spring Data JPA** | 3.3 | ORM layer over PostgreSQL |
| **Spring Kafka** | 3.2 | Kafka producer/consumer integration |
| **Spring Actuator** | 3.3 | Health, metrics, Prometheus endpoint |
| **Spring Mail** | 3.3 | Email notifications (SMTP) |
| **Spring WebSocket** | 3.3 | WebSocket support |
| **Lombok** | 1.18.36 | Boilerplate reduction (JDK 25 compatible) |
| **jjwt** | 0.12.5 | JWT generation and validation |
| **Redisson** | 3.28.0 | Redis client (optional, graceful fallback) |
| **Resilience4j** | 2.2.0 | Circuit breaker, retry policies |
| **Micrometer Prometheus** | 1.13 | Metrics export for Prometheus |
| **Apache Commons Lang** | 3.14 | Utility functions |

---

## Database Layer

| Technology | Role |
|------------|------|
| **PostgreSQL 14+** | Primary relational database — users, benefits, applications |
| **Hibernate / JPA** | ORM with `ddl-auto: update` (schema auto-managed) |
| **HikariCP** | Connection pooling (pool: 5–20 connections) |
| **ClickHouse** | Analytical event store — application event analytics |

### Core Entities

| Entity | Table | Description |
|--------|-------|-------------|
| `User` | `users` | Applicant profiles with disability info |
| `Benefit` | `benefits` | Benefit catalog (Sanad Card, Financial Aid...) |
| `BenefitApplication` | `benefit_applications` | Application records with UUID reference numbers |
| `Document` | `documents` | Uploaded document metadata |
| `Notification` | `notifications` | User notification records |
| `BenefitUsage` | `benefit_usages` | Usage tracking per benefit |

---

## Messaging & Async

| Technology | Role | Required |
|------------|------|----------|
| **Apache Kafka** | Event streaming for application lifecycle events | ❌ Optional |
| **Spring Async** | Background eligibility processing via thread pools | ✅ Always on |
| **ThreadPoolTaskExecutor** | Custom executors: `applicationProcessorExecutor`, `notificationExecutor`, `analyticsExecutor` | ✅ Always on |

### Kafka Topics

| Topic | Producer | Consumer | Purpose |
|-------|----------|----------|---------|
| `pod-application-events` | `KafkaProducerService` | `KafkaConsumerService` | Application submitted / status updated |

> **Resilience**: Kafka and Redis failures are caught and logged as warnings — they never block or fail an application submission.

---

## Security

| Component | Technology | Details |
|-----------|-----------|---------|
| Authentication | JWT (HS512) | 24h token expiry, 7d refresh |
| Password Hashing | BCrypt | Spring Security default |
| Session | Stateless | No server-side sessions |
| Filter | `AuthTokenFilter` | Validates JWT on every request |
| CORS | Disabled (monolith) | Frontend served from same origin |

### Permitted Endpoints (No Auth Required)
- `/api/auth/**` — Login
- `/api/benefits/**` — Apply (demo mode, no login required)
- `/api/public/**` — Public info
- `/assets/**`, `/*.png`, `/`, `/apply` — Static SPA files

---

## Infrastructure

| Service | Version | Purpose |
|---------|---------|---------|
| **Redis** | 7+ | Distributed lock (optional — falls back to in-memory) |
| **Apache Kafka** | 3.7 | Event bus (optional — non-fatal if down) |
| **ClickHouse** | 24+ | Real-time analytics (optional) |
| **Docker / Docker Compose** | latest | Local infrastructure stack |

---

## Build & Tooling

| Tool | Version | Purpose |
|------|---------|---------|
| **Maven** | 3.9+ | Java dependency management & build |
| **Node.js** | 20+ | Frontend dependencies |
| **npm** | 10+ | Frontend package manager |
| **Vite** | 8 | Frontend bundler |
| **OpenJDK** | 25 | Java runtime |
| **PostCSS** | latest | CSS processing for Tailwind |

---

## Monitoring

| Tool | Endpoint | Purpose |
|------|---------|---------|
| Spring Actuator | `/actuator/health` | Health check |
| Prometheus | `/actuator/prometheus` | Metrics scrape |
| Actuator Metrics | `/actuator/metrics` | JVM, DB pool, HTTP metrics |

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Monolith over microservices** | Simpler deployment, no service-mesh overhead for a government portal |
| **Redis optional** | Enables running without Redis in demo/dev — in-memory dedup ensures correctness |
| **Kafka non-fatal** | Application saves to DB first; events are best-effort — no data loss |
| **SPA embedded in JAR** | Single deployment artifact, no CDN or separate frontend server needed |
| **Lombok 1.18.36** | Required for JDK 25 compatibility (previous 1.18.32 broke on JDK 25) |
