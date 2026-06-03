# POD Benefit Management Platform

> **Dubai's Official People of Determination (POD) Benefit Management System**  
> Built for the Community Development Authority (CDA), Dubai Government

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.0-brightgreen)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-Gov--Internal-red)](LICENSE)

---

## Overview

The **POD Benefit Management Platform** is a full-stack monolithic web application that manages the Sanad Card application lifecycle for People of Determination in Dubai. It supports multi-step online applications, document collection, medical eligibility processing, and benefit administration — all served from a single Spring Boot + React monolith.

---

## Features

- 🪪 **Sanad Card Application** — 4-step guided form (Registration → Disability Info → Documents → Verification)
- ✅ **Idempotent Submissions** — DB-level duplicate detection prevents double applications
- ⚡ **Async Processing** — Background eligibility checks via thread pool executor
- 📊 **Analytics Pipeline** — Kafka → ClickHouse event streaming (when brokers available)
- 🔐 **JWT Security** — Stateless auth with BCrypt password encoding
- 🚀 **Single-JAR Deploy** — React SPA embedded inside the Spring Boot JAR

---

## Architecture

```
Browser (React SPA)
     │
     ▼
Spring Boot Monolith (port 8080)
     ├── /api/auth/**         → AuthController (JWT login)
     ├── /api/benefits/**     → BenefitController (apply endpoint)
     ├── /apply, /            → SpaController → React Router
     │
     ├── BenefitApplicationService
     │     ├── DB-level idempotency check
     │     ├── ApplicationRepository (PostgreSQL)
     │     ├── Kafka event (non-fatal, fire-and-forget)
     │     └── Async eligibility processor (ThreadPool)
     │
     └── Infrastructure (optional)
           ├── PostgreSQL (required)
           ├── Redis / Redisson (optional — graceful fallback)
           ├── Kafka (optional — non-fatal if unavailable)
           └── ClickHouse (optional — analytics only)
```

---

## Quick Start

### Prerequisites

| Service | Required | Notes |
|---------|----------|-------|
| JDK 25 | ✅ Yes | OpenJDK 25+ |
| Maven 3.9+ | ✅ Yes | |
| PostgreSQL 14+ | ✅ Yes | DB: `pod_db`, user: `pod_user` |
| Node.js 20+ | ✅ Yes | For frontend builds |
| Redis | ❌ Optional | Falls back to in-memory dedup |
| Kafka | ❌ Optional | Events silently dropped if unavailable |
| ClickHouse | ❌ Optional | Analytics only |

### 1. Setup PostgreSQL

```sql
CREATE USER pod_user WITH PASSWORD 'pod_pass';
CREATE DATABASE pod_db OWNER pod_user;
GRANT ALL PRIVILEGES ON DATABASE pod_db TO pod_user;
```

### 2. Build Frontend

```bash
cd backend/frontend
npm install
npm run build
# Outputs to backend/src/main/resources/static/
```

### 3. Run the Backend

```bash
cd backend
mvn spring-boot:run
```

Server starts at **http://localhost:8080**

### 4. Demo Credentials

The `DataInitializer` seeds on first run:

| Field | Value |
|-------|-------|
| Email | `demo@pod.gov.ae` |
| Password | `password123` |
| Emirates ID | `784-1234-5678901-2` |
| Disability % | 50% (Physical) |

---

## API Reference

### Authentication
```
POST /api/auth/login
Content-Type: application/json
{ "email": "demo@pod.gov.ae", "password": "password123" }
```

### Apply for Benefit
```
POST /api/benefits/{benefitId}/apply?userId={userId}
Content-Type: text/plain
Body: "Reason for applying..."
```

Response: `BenefitApplication` JSON with `referenceNumber`, `status: PENDING`

---

## Project Structure

```
POD Benefit Management Platform/
├── backend/
│   ├── src/main/java/ae/gov/pod/
│   │   ├── config/          # Security, Redis, Thread pool, Data seeder
│   │   ├── controller/      # Auth, Benefit, SPA controllers
│   │   ├── entity/          # JPA entities (User, Benefit, BenefitApplication...)
│   │   ├── enums/           # Role, ApplicationStatus, DisabilityType...
│   │   ├── event/           # Kafka event DTOs
│   │   ├── kafka/           # Producer & Consumer services
│   │   ├── repository/      # Spring Data JPA repositories
│   │   ├── security/        # JWT utils, UserDetailsService, AuthEntryPoint
│   │   └── service/         # BenefitApplicationService (core logic)
│   ├── frontend/
│   │   └── src/
│   │       ├── pages/       # LandingPage.jsx, ApplicationPortal.jsx
│   │       └── App.jsx      # React Router setup
│   └── pom.xml
├── docker-compose.yml
├── README.md
├── TECHSTACK.md
└── USER_MANUAL.md
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_NAME` | `pod_db` | Database name |
| `DB_USER` | `pod_user` | DB username |
| `DB_PASS` | `pod_pass` | DB password |
| `REDIS_HOST` | `localhost` | Redis host (optional) |
| `REDIS_PORT` | `6379` | Redis port (optional) |
| `KAFKA_BOOTSTRAP` | `localhost:9092` | Kafka brokers (optional) |
| `JWT_SECRET` | *(see yml)* | 256-bit JWT signing key |

---

## Docker Compose

```bash
docker-compose up -d   # Starts PostgreSQL, Redis, Kafka, ClickHouse
mvn spring-boot:run    # Run application
```

---

## License

Internal Government Use — Community Development Authority, Dubai  
© 2024 Dubai Government. All rights reserved.
