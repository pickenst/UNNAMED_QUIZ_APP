FROM eclipse-temurin:21-jre

WORKDIR /app

COPY ./processor/target/processor-1.0-SNAPSHOT.jar App.jar

RUN mkdir -p /processor/uploads /processor/uploads/extracted

EXPOSE 8084

ENV PORT=8084

CMD ["java", "-jar", "App.jar"]
