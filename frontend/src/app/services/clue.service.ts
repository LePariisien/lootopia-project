import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clue } from '../models/clue.model';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class ClueService {
  constructor(private http: HttpClient) {}

  createClues(token: string, clues: Clue[]): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(ApiRoutes.createCluesBatch(), clues, { headers, responseType: 'text' });
  }

  getCluesByTreasureId(token: string, treasureId: string): Observable<Clue[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<Clue[]>(ApiRoutes.getCluesByTreasureId(treasureId), { headers });
  }

}
