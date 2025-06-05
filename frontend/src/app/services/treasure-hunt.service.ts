import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TreasureHunt } from '../models/treasure-hunt.model';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class TreasureHuntService {
  constructor(private http: HttpClient) {}

  getAllTreasureHunts(): Observable<TreasureHunt[]> {
    return this.http.get<TreasureHunt[]>(ApiRoutes.treasureHuntAll());
  }

  createTreasureHunt(token: string, body: TreasureHunt): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(ApiRoutes.treasureHunt(), body, { headers });
  }

  getTreasureHunt(token: string, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(ApiRoutes.treasureHuntById(id), { headers });
  }

  digAHole(token: string, treasureId: string, latitude: number, longitude: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(ApiRoutes.digAHole(treasureId, latitude, longitude), { headers });
  }
}
