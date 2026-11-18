import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-task-form',
  styleUrl: './task-form.scss',
  templateUrl: './task-form.html',
})
export class TaskForm {
  private taskService = inject(TaskService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  taskId = this.route.snapshot.paramMap.get('id');
  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    completed: [false, Validators.required]
  });

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const newTask = {
      id: Date.now(),
      title: this.taskForm.value.title ?? '',
      description: this.taskForm.value.description ?? '',
      completed: this.taskForm.value.completed ?? false
    };
    this.taskService.addTask(newTask).subscribe({
      next: () => {
        alert('Task added successfully');
        this.router.navigate(['/dashboard']);
      },
      error: error => console.error('Could not save task', error)
    });
  }
  constructor() {
    if (this.taskId) {
      this.taskService.getTask(this.taskId).subscribe({
        next: task => {
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            completed: task.completed
          });
        },
        error: error => console.error('Could not load task', error)
      });
    }
  }
}
