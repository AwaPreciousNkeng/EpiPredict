package com.codewithpcodes.epipredict;

import com.codewithpcodes.epipredict.auth.AuthenticationService;
import com.codewithpcodes.epipredict.auth.RegisterRequest;
import com.codewithpcodes.epipredict.user.Role;
import com.codewithpcodes.epipredict.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableFeignClients
@EnableScheduling
public class EpiPredictApplication {

    public static void main(String[] args) {
        SpringApplication.run(EpiPredictApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(
            AuthenticationService service,
            UserRepository repository,
            UserRepository userRepository) {
        return args -> {
            String defaultEmail = "admin@gmail.com";

            if (!userRepository.existsByEmail(defaultEmail)) {
                var admin = new RegisterRequest(
                        "EpiPredict",
                        "Admin",
                        "admin@gmail.com",
                        "password",
                        "",
                        Role.ADMIN
                );
                System.out.println("Admin token: " + service.register(admin).getAccessToken());
            } else {
                System.out.println("Default ADMIN exists already, skipping creation.");
            }
        };
    }
}
