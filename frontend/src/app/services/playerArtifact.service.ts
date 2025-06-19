import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';
import { PlayerArtifact } from '../models/player-artifact.model';

@Injectable({ providedIn: 'root' })
export class PlayerArtifactService {

  constructor(private http: HttpClient) {}

  getPlayerArtefactsByPlayerId(): Observable<PlayerArtifact[]> {
    return this.http.get<PlayerArtifact[]>(ApiRoutes.playerArtefactsByToken());
  }

  createPlayerArtifact(artifactId: string): Observable<PlayerArtifact> {
    return this.http.post<PlayerArtifact>(ApiRoutes.createPlayerArtifact(artifactId), null);
  }

}
