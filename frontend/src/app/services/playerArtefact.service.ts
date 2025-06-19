import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';
import { PlayerArtefact } from '../models/player-artefact.model';

@Injectable({ providedIn: 'root' })
export class PlayerArtefactService {

  constructor(private http: HttpClient) {}

  getPlayerArtefactsByPlayerId(): Observable<PlayerArtefact[]> {
    return this.http.get<PlayerArtefact[]>(ApiRoutes.playerArtefactsByToken());
  }

  createPlayerArtefact(artefactId: string): Observable<PlayerArtefact> {
    return this.http.post<PlayerArtefact>(ApiRoutes.createPlayerArtefact(artefactId), null);
  }

}
