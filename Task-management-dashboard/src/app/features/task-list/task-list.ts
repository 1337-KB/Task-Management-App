import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { TaskService } from '../../services/task';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  imports: [NgClass, RouterLink],
  selector: 'app-task-list',
  styleUrl: './task-list.scss',
  templateUrl: './task-list.html',
})
export class TaskList {
  taskService = inject(TaskService)
  http = inject(HttpClient);
  tasks = this.taskService.tasks;
  loading = this.taskService.loading;
  constructor() {
    this.taskService.loadTasks();
  }
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.update(task => task.filter(t => t.id !== id));
      },
      error: (err) => {
        console.error('Failed to delete task', err);
      }
    });
  }
  toggleTaskCompletion(id: number) {
    this.taskService.toggleTaskCompletion(id);
  }
}
