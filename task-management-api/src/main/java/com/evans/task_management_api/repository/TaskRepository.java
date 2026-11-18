package com.evans.task_management_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.evans.task_management_api.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    
}
