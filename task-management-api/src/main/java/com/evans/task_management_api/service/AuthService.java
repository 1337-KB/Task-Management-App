package com.evans.task_management_api.service;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public boolean authenticate(
            String username,
            String password) {

        return "admin".equals(username)
                &&
               "password123".equals(password);
    }
}