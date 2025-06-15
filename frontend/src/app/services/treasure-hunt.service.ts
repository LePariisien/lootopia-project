import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreasureHunt } from '../models/treasure-hunt.model';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class TreasureHuntService {
  constructor(private http: HttpClient) {}

  getAllTreasureHunts(): Observable<TreasureHunt[]> {
    return this.http.get<TreasureHunt[]>(ApiRoutes.treasureHuntAll());
  }

  createTreasureHunt(body: TreasureHunt): Observable<any> {
    return this.http.post(ApiRoutes.treasureHunt(), body);
  }

  getTreasureHunt(id: number): Observable<any> {
    return this.http.get(ApiRoutes.treasureHuntById(id));
  }

  digAHole(treasureId: string, latitude: number, longitude: number): Observable<any> {
    return this.http.get(ApiRoutes.digAHole(treasureId, latitude, longitude));
  }

  getTreasureHuntCount(): Observable<number> {
        return this.http.get<number>(ApiRoutes.treasureHuntCount());
    }
}
