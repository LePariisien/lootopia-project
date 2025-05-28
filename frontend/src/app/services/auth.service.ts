import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/login';
  private verifyMfaUrl = 'http://localhost:8080/api/auth/verify-mfa';
  private refreshUrl = 'http://localhost:8080/api/token/refresh';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password });
  }

  verifyMfa(username: string, mfaCode: string): Observable<any> {
    return this.http.post(this.verifyMfaUrl + `?username=${username}&mfaCode=${mfaCode}`, {});
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError(() => new Error('Pas de refreshToken'));
    }
    return this.http.post<any>(this.refreshUrl, { refreshToken });
  }
}