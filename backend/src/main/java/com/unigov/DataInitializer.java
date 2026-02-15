package com.unigov;

import com.unigov.entity.Role;
import com.unigov.entity.User;
import com.unigov.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@unigov.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("Administrator");
            admin.setRole(Role.ROLE_ADMIN);
            userRepository.save(admin);

            User delegue = new User();
            delegue.setUsername("mouhib_fahem");
            delegue.setEmail("mouhib.fahem28@gmail.com");
            delegue.setPassword(passwordEncoder.encode("mouhib"));
            delegue.setFullName("Mouhib Fahem");
            delegue.setRole(Role.ROLE_DELEGUE);
            userRepository.save(delegue);

            User student = new User();
            student.setUsername("etudiant1");
            student.setEmail("etudiant@unigov.com");
            student.setPassword(passwordEncoder.encode("etudiant123"));
            student.setFullName("Etudiant Test");
            student.setRole(Role.ROLE_STUDENT);
            userRepository.save(student);

            logger.info("=== Default accounts created ===");
            logger.info("Admin:    admin / admin123");
            logger.info("Delegue:  mouhib_fahem / mouhib");
            logger.info("Student:  etudiant1 / etudiant123");
            logger.info("================================");
        } else {
            logger.info("Users already exist, skipping data initialization.");
        }
    }
}
