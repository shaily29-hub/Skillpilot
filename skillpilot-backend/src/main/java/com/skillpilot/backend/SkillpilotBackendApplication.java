package com.skillpilot.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SkillpilotBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillpilotBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner test() {
        return args -> {
            System.out.println("APP STARTED");
        };
    }
}