package com.evans.task_management_api.service;

import org.springframework.stereotype.Service;
import com.evans.task_management_api.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public AuthService(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }



    public boolean authenticate(
            String username,
            String password) {

        return (boolean) userRepository
        .findByUsername(username)
        .map(user -> 
            encoder.matches(
                password, 
                user.getPassword()
            ))
            .orElse(false);
    }
}