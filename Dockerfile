FROM openjdk:17
COPY target/classes/ /tmp
WORKDIR /tmp
CMD java com.example.keystorage.KeyStorageApplication