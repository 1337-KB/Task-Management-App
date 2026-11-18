package com.evans.task_management_api.model;

public record LoginResponse (
    String token,
    String role
) {
}
