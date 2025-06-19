import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';
import { Player } from '../models/player.model';
import { Artefact } from '../models/artefact.model';
import { PlayerArtefact } from '../models/player-artefact.model';

@Injectable({ providedIn: 'root' })
export class PlayerService {

  constructor(private http: HttpClient) {}

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(ApiRoutes.playerAll());
  }

  getPlayerCount(): Observable<number> {
    return this.http.get<number>(ApiRoutes.playerCount());
  }

  getPlayerById(playerId: string): Observable<Player> {
    return this.http.get<Player>(ApiRoutes.playerById(playerId));
  }

  getPlayer(): Observable<Player> {
    return this.http.get<Player>(ApiRoutes.player());
  }

  getPlayerByNickname(nickname: string): Observable<any> {
    return this.http.get(ApiRoutes.playerByNickname(nickname));
  }

  getArtefacts(): Observable<PlayerArtefact[]> {
    return this.http.get<PlayerArtefact[]>(ApiRoutes.getArtefacts());
  }

  getArtefactsByPlayerId(id: string): Observable<PlayerArtefact[]> {
    return this.http.get<PlayerArtefact[]>(ApiRoutes.getArtefactsByPlayerId(id));
  }

}
