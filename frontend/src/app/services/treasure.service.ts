import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Treasure } from '../models/treasure.model';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class TreasureService {
  constructor(private http: HttpClient) {}

  getTreasureDetails(id: string): Observable<Treasure> {
    return this.http.get<Treasure>(ApiRoutes.treasureDetails(id));
  }
  getAllTreasures(): Observable<Treasure[]> {
    return this.http.get<Treasure[]>(ApiRoutes.treasureAll());
  }

  createTreasure(body: Treasure): Observable<any> {
    return this.http.post(ApiRoutes.treasure(), body);
  }

  getTreasure(id: string): Observable<any> {
    return this.http.get(ApiRoutes.treasureById(id));
  }

  digAHole(treasureId: string, latitude: number, longitude: number): Observable<any> {
    return this.http.get(ApiRoutes.digAHole(treasureId, latitude, longitude));
  }
}
