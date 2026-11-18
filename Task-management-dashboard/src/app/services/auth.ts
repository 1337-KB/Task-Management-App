import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/auth/login';

  login(username: string, password: string) :Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { username, password });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    if (!token){
      return false;
    }
    return true;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ADMIN';
  }
}