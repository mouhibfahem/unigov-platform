# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

# Copy all files to handle the monorepo structure
COPY . .

# Build only the backend module
RUN mvn -f backend/pom.xml clean package -DskipTests

# Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the jar from the backend target
COPY --from=build /app/backend/target/*.jar app.jar

# Dynamic port for Railway
EXPOSE 8081

RUN mkdir uploads

# Start the application using the $PORT provided by Railway
ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]
