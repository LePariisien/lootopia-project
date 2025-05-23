FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

EXPOSE ${PAYMENT_PORT}

CMD ["java", "-jar", "target/payment_service-0.0.1-SNAPSHOT.jar"]
