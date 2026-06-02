# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
# Copy package files first for caching
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install
# Copy rest of frontend
COPY frontend/ ./
# Ensure output directory exists for Vite build
RUN mkdir -p ../backend/src/main/resources/static
RUN npm run build

# Stage 2: Build Backend
FROM maven:3.9-eclipse-temurin-17-alpine AS backend-builder
WORKDIR /app/backend
# Copy POM and download dependencies
COPY backend/pom.xml .
# Copy source code
COPY backend/src ./src
# Copy the compiled React app from frontend builder
COPY --from=frontend-builder /app/backend/src/main/resources/static ./src/main/resources/static
# Package the application
RUN mvn clean package -DskipTests

# Stage 3: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copy the compiled JAR
COPY --from=backend-builder /app/backend/target/*.jar app.jar
EXPOSE 8080
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
