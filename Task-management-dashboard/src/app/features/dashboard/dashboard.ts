import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';

@Component({
  imports: [RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  totalTasks = computed(() => this.taskService.tasks().length);
  completedTasks = computed(() => this.taskService.tasks().filter(task => task.completed).length);
  pendingTasks = computed(() => this.taskService.tasks().filter(task => !task.completed).length);
  completedPercentage = computed(() => {
    const total = this.totalTasks();
    return total === 0 ? 0 : (this.completedTasks() / total) * 100;
  });
  constructor(private taskService: TaskService) {
    this.taskService.loadTasks();
  }
}