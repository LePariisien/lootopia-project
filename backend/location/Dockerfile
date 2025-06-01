FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

EXPOSE ${LOCATION_PORT}

CMD ["java", "-jar", "target/locationserv-0.0.1-SNAPSHOT.jar"]
