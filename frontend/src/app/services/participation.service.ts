import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Participation } from '../models/participation.model';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class ParticipationService {
  constructor(private http: HttpClient) {}

  createParticipation(treasureHuntId: string): Observable<any> {
    return this.http.post(ApiRoutes.participationByTreasureHuntQuery(treasureHuntId), null);
  }

  getParticipation(id: string): Observable<any> {
    return this.http.get(ApiRoutes.participationById(id));
  }

  updateParticipation(body: Participation): Observable<any> {
    return this.http.put(ApiRoutes.participation(), body);
  }

  getParticipationByTreasureHuntId(treasureHuntId: string): Observable<any> {
    return this.http.get(ApiRoutes.participationByTreasureHuntId(treasureHuntId));
  }

  getParticipationByTreasureHuntIdAndPlayer(treasureHuntId: string): Observable<any> {
    return this.http.get(ApiRoutes.participationByTreasureHuntIdAndPlayer(treasureHuntId));
  }

}
