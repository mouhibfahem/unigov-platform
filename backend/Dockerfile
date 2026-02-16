# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

# Copy the backend files
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn package -DskipTests

# Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Standard dynamic port for cloud platforms
EXPOSE 8081
RUN mkdir uploads

# Use the dynamic PORT from environment
ENTRYPOINT ["java", "-Dserver.port=${PORT:8081}", "-jar", "app.jar"]
