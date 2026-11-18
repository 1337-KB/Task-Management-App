package com.evans.task_management_api.model;

public record LoginRequest (
    String username,
    String password
) {

}
