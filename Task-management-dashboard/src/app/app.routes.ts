import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
        canActivate: [authGuard]
    },
    {
        path: 'tasks',
        loadComponent: () => import('./features/task-list/task-list').then(m => m.TaskList),
        canActivate: [authGuard]
    },
    {
        path: 'task-form',
        loadComponent: () => import('./features/task-form/task-form').then(m => m.TaskForm),
        canActivate: [authGuard]
    },
    {
        path: 'task-form/:id',
        loadComponent: () => import('./features/task-form/task-form').then(m => m.TaskForm),
        canActivate: [authGuard]
    },

    {
        path: 'login',
        loadComponent: () => import('./features/login/login').then(m => m.Login)
    },

    {
        path: 'tasks',
        loadComponent: () => import('./features/task-list/task-list').then(m => m.TaskList),
        canActivate: [authGuard]
    }
];
