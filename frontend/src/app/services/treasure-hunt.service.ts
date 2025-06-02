import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TreasureHuntRequest } from '../models/treasure-hunt.model';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class TreasureHuntService {
  constructor(private http: HttpClient) {}

  getAllTreasureHunts(): Observable<TreasureHuntRequest[]> {
    return this.http.get<TreasureHuntRequest[]>(ApiRoutes.treasureHuntAll());
  }

  createTreasureHunt(token: string, body: TreasureHuntRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(ApiRoutes.treasureHunt(), body, { headers });
  }
}
