FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

EXPOSE ${EUREKA_PORT}

CMD ["java", "-jar", "target/eureka_server-0.0.1-SNAPSHOT.jar"]
