import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Task-management-dashboard');
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}