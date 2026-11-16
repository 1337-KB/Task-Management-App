package com.evans.task_management_api.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.evans.task_management_api.model.LoginRequest;
import com.evans.task_management_api.model.LoginResponse;
import com.evans.task_management_api.service.AuthService;
import com.evans.task_management_api.util.JwtUtil;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authservice;

    public AuthController(AuthService authservice) {
        this.authservice = authservice;
    }
    @PostMapping("/login")
    public LoginResponse login(
        @RequestBody 
        LoginRequest loginRequest) {
            if (!authservice.authenticate(loginRequest.username(), loginRequest.password())){
                throw new RuntimeException(
                "Invalid username or password"
            );
            }
            String token = JwtUtil.generateToken(loginRequest.username());
            return new LoginResponse(token);
        }
}

