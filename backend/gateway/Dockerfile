FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

EXPOSE ${GATEWAY_PORT}

CMD ["java", "-jar", "target/api_gateway-0.0.1-SNAPSHOT.jar"]
