import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private fb = new FormBuilder();
  authService = inject(Auth);
  router = inject(Router);
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  }); 

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.get('username')?.value ?? '',
        this.loginForm.get('password')?.value ?? ''
      ).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          alert('Login successful');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
          alert(err.status === 401
            ? 'Invalid username or password'
            : 'Login failed. Check that the backend is running and try again.');
        }
      });
    }
  }
}