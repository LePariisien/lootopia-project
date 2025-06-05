import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Treasure } from '../models/treasure.model';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class TreasureService {
  constructor(private http: HttpClient) {}

  getAllTreasures(): Observable<Treasure[]> {
    return this.http.get<Treasure[]>(ApiRoutes.treasureAll());
  }

  createTreasure(token: string, body: Treasure): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(ApiRoutes.treasure(), body, { headers });
  }

  getTreasure(token: string, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(ApiRoutes.treasureById(id), { headers });
  }

  digAHole(token: string, treasureId: string, latitude: number, longitude: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(ApiRoutes.digAHole(treasureId, latitude, longitude), { headers });
  }
}
