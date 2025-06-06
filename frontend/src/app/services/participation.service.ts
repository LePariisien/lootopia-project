import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Participation } from '../models/participation.model';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class ParticipationService {
  constructor(private http: HttpClient) {}

  createParticipation(token: string, treasureHuntId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(ApiRoutes.participationByIdParam(treasureHuntId), { headers });
  }

  getParticipation(token: string, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(ApiRoutes.participationById(id), { headers });
  }

  updateParticipation(token: string, body: Participation): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(ApiRoutes.participation(), body, { headers });
  }

  getParticipationByTreasureHuntId(token: string, treasureHuntId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(ApiRoutes.participationByTreasureHuntId(treasureHuntId), { headers });
  }

  getParticipationByTreasureHuntIdAndPlayer(token: string, treasureHuntId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(ApiRoutes.participationByTreasureHuntIdAndPlayer(treasureHuntId), { headers });
  }

}
