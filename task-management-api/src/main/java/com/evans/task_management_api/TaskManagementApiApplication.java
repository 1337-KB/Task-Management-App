package com.evans.task_management_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.evans.task_management_api.util.EnvLoader;

@SpringBootApplication
public class TaskManagementApiApplication {

	public static void main(String[] args) {
		EnvLoader.loadEnv();  // Load .env.local before Spring starts
		SpringApplication.run(TaskManagementApiApplication.class, args);
	}

}
	