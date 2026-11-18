package com.evans.task_management_api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.evans.task_management_api.model.Task;
import com.evans.task_management_api.repository.TaskRepository;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }
    
    public Task updateTask(Long id, Task task) {
        Task existingTask = taskRepository.findById(id).orElse(null);
        if (existingTask != null) {
            existingTask.setTitle(task.getTitle());
            existingTask.setDescription(task.getDescription());
            existingTask.setCompleted(task.getCompleted());
            return taskRepository.save(existingTask);
        }
        return null;
    }
    
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
