import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/tasks'
    tasks = signal<Task[]>([
        {
            id: 1,
            title: 'Sample Task',
            description: 'This is a sample task',
            completed: false
        }
    ]);
    loading = signal(false);
    toggleTaskCompletion(id: number) {
        const task = this.tasks().find(task => task.id === id);
        if (!task) {
            return;
        }
        this.http.patch<Task>(`${this.apiUrl}/${id}`, {
            completed: !task.completed
        }).subscribe({
            next: updatedTask => {
                this.tasks.update(tasks => tasks.map(task => task.id === id ? updatedTask : task));
            },
            error: error => console.error('Failed to update task completion', error)
        });
    }
    loadTasks() {
        this.loading.set(true);
        this.http.get<Task[]>(this.apiUrl).subscribe(tasks => {
            this.tasks.set(tasks);
        });
        this.loading.set(false);
    }
    addTask(task: Task):Observable<Task[]> {
        return this.http.post<Task[]>(this.apiUrl, task);
    };
    
    deleteTask(id: Task['id']) {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }
    editTask(id: Task['id'], updatedTask: Partial<Task>) {
        return this.http.patch<Task>(`${this.apiUrl}/${id}`, updatedTask);
    }
    getTask(id: string | Task['id']): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${id}`);
    }
}
