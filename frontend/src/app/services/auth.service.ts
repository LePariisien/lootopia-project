import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiRoutes } from '../api-routes';
import { Router } from '@angular/router';
import { PlayerService } from './player.service';
import { Player } from '../models/player.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  accessTokenString = "accessToken";
  refreshTokenString = "refreshToken";
  playerIdString = "playerId";
  nicknameString = "nickname";
  emailVerifiedString = "emailVerified";

  constructor(private http: HttpClient, private router: Router, private playerService: PlayerService) { }

  register(userData: any, siteURL: string): Observable<any> {
    return this.http.post(ApiRoutes.signUp() + '?siteURL=' + encodeURIComponent(siteURL), userData);
  }

  login(email: string, password: string, mfaCode: string = ''): Observable<any> {
    if (!email || !password) {
      return throwError(() => new Error('Identifiants manquants'));
    }
    return this.http.post(ApiRoutes.login(), { email, password, mfaCode });
  }

  verifyAccount(code: string) {
    return this.http.get(ApiRoutes.verify() + '?code=' + code);
  }

  verifyMfa(username: string, mfaCode: string): Observable<any> {
    return this.http.post(ApiRoutes.verifyMfa(username, mfaCode), {});
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem(this.refreshTokenString);
    if (!refreshToken) {
      return throwError(() => new Error('Pas de refreshToken'));
    }
    return this.http.post<any>(ApiRoutes.refresh(), { refreshToken });
  }

  setTokens(accessToken: string, refreshToken: string, emailVerified: boolean = false, redirect: boolean = false): void {
    localStorage.setItem(this.accessTokenString, accessToken);
    localStorage.setItem(this.refreshTokenString, refreshToken);
    localStorage.setItem(this.emailVerifiedString, String(emailVerified));

    this.playerService.getPlayer().subscribe({
      next: (player: Player) => {
        localStorage.setItem(this.playerIdString, player.id);
        localStorage.setItem(this.nicknameString, player.nickname || '');
        if (redirect) {
          this.router.navigate(['/']);        }
      },
      error: (err: any) => {
        console.error('Erreur Player API:', err);
        if (redirect) {
          window.location.reload();
        }
      }
    });

  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.accessTokenString);
  }

  getToken(): string | null  {
    return localStorage.getItem(this.accessTokenString);
  }

  logout(redirect: boolean = false): void {
    localStorage.removeItem(this.accessTokenString);
    localStorage.removeItem(this.refreshTokenString);
    localStorage.removeItem(this.playerIdString);
    localStorage.removeItem(this.nicknameString);
    localStorage.removeItem(this.emailVerifiedString);
    if (redirect) {
      this.router.navigate(['/login']);
    }
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

  getPlayerId(): string | null {
    return localStorage.getItem(this.playerIdString);
  }

  getNickname(): string | null {
    return localStorage.getItem(this.nicknameString);
  }
}
