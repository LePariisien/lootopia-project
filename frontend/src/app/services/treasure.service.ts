import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Treasure } from '../models/treasure-hunt.model';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class TreasureService {
  constructor(private http: HttpClient) {}

  getTreasureDetails(id: string): Observable<Treasure> {
    return this.http.get<Treasure>(ApiRoutes.treasureDetails(id));
  }
}
