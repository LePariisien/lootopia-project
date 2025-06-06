import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';
import { Player } from '../models/player.model';

@Injectable({ providedIn: 'root' })
export class PlayerService {

  constructor(private http: HttpClient) {}

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(ApiRoutes.playerAll());
  }

  getPlayerCount(): Observable<number> {
    return this.http.get<number>(ApiRoutes.playerCount());
  }

  getPlayerById(token: string, playerId: string): Observable<Player> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Player>(ApiRoutes.playerById(playerId), { headers });
  }

}
