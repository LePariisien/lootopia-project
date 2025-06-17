import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clue } from '../models/clue.model';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class ClueService {
  constructor(private http: HttpClient) {}

  createClues(clues: Clue[]): Observable<any> {
    return this.http.post(ApiRoutes.createCluesBatch(), clues, { responseType: 'text' });
  }

  getCluesByTreasureId(treasureId: string): Observable<Clue[]> {
    return this.http.get<Clue[]>(ApiRoutes.getCluesByTreasureId(treasureId));
  }

}
