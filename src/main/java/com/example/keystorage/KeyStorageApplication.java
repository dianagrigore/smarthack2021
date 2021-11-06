package com.example.keystorage;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@EnableMongoAuditing
@Slf4j
@SpringBootApplication
public class KeyStorageApplication {

    public static void main(String[] args) {
        SpringApplication.run(KeyStorageApplication.class, args);
    }

}
