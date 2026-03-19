package com.codewithpcodes.epipredict;

import com.codewithpcodes.epipredict.auth.AuthenticationService;
import com.codewithpcodes.epipredict.auth.CreateAdminRequest;
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
    CommandLineRunner initAdmin(
            AuthenticationService service,
            UserRepository userRepository) {
        return args -> {
            String defaultEmail = "admin@admin.com";

            if (!userRepository.existsByEmail(defaultEmail)) {
                var admin = new CreateAdminRequest(
                        "admin",
                        "pcodes",
                        "admin@admin.com",
                        "password",
                        ""
                );
                System.out.println("Admin token: " + service.createAdmin(admin).getAccessToken());
            } else {
                System.out.println("Default ADMIN exists already, skipping creation.");
            }
        };
    }
}
