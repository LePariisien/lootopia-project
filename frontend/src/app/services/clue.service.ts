import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clue } from '../models/clue.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClueService {
  private apiUrl = 'http://localhost:8080/locationserv/api/clue/batch';

  constructor(private http: HttpClient) {}

  createClues(token: string, clues: Clue[]): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, clues, { headers, responseType: 'text' });
  }
}
