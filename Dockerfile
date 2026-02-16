# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy all files to handle the monorepo structure
COPY . .

# Build only the backend module
RUN mvn -f backend/pom.xml clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the jar from the backend target
COPY --from=build /app/backend/target/*.jar app.jar

# Dynamic port for Railway
EXPOSE 8081

RUN mkdir uploads

# Start the application using variables from Railway
ENTRYPOINT java -Dserver.port=${PORT} \
    -Dspring.data.mongodb.uri=${MONGODB_URI} \
    -Dunigov.app.jwtSecret=${JWT_SECRET} \
    -Xmx512m -jar app.jar
