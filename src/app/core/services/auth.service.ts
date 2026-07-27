
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload)
      .pipe(tap(res => this.persistToken(res.token)));
  }

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, payload)
      .pipe(tap(res => this.persistToken(res.token)));
  }

  me(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  logout(): void {
    localStorage.removeItem('shopzone_token');
  }

  getToken(): string | null {
    return localStorage.getItem('shopzone_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private persistToken(token: string): void {
    localStorage.setItem('shopzone_token', token);
  }
}