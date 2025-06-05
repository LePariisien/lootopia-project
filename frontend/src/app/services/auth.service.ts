import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser: any = null; // à remplir lors du login ou du chargement du profil

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(ApiRoutes.login(), { username, password });
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken') && !!this.currentUser;
  }

  getPlayerId(): string | null {
    return this.currentUser ? this.currentUser.player_id : null;
  }
}
