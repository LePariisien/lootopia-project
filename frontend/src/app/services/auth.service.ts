import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiRoutes } from '../api-routes';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(ApiRoutes.login(), { email, password });
  }

  verifyMfa(username: string, mfaCode: string): Observable<any> {
    return this.http.post(ApiRoutes.verifyMfa(username, mfaCode), {});
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError(() => new Error('Pas de refreshToken'));
    }
    return this.http.post<any>(ApiRoutes.refresh(), { refreshToken });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getToken(): string | null  {
    return localStorage.getItem('accessToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user_id || null;
  }

  getTokenOrRedirect(): string | null {
    const token = this.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return null;
    }
    return token;
  }
}
