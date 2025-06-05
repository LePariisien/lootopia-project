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

  constructor(private http: HttpClient, private router: Router, private playerService: PlayerService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(ApiRoutes.login(), { email, password });
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

  setTokens(accessToken: string, refreshToken: string, redirect: boolean = false): void {
    localStorage.setItem(this.accessTokenString, accessToken);
    localStorage.setItem(this.refreshTokenString, refreshToken);

    this.playerService.getPlayer(accessToken).subscribe({
      next: (player: Player) => {
        console.log('Player récupéré:', player);
        localStorage.setItem(this.playerIdString, player.id);
        console.log('Player ID stocké:', localStorage.getItem(this.playerIdString));
      },
      error: (err: any) => {
        console.error('Erreur Player API:', err);
      }
    });

    if (redirect) {
      this.router.navigate(['/']);
    }
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
    console.log('1| ',localStorage.getItem(this.playerIdString))
    return localStorage.getItem(this.playerIdString);
  }
}
