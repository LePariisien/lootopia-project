import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TreasureHuntRequest } from '../models/treasure-hunt.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TreasureHuntService {
  private apiUrl = 'http://localhost:8080/lootopia/api/treasure-hunt';

  constructor(private http: HttpClient) {}

  createTreasureHunt(token: string, body: TreasureHuntRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, body, { headers });
  }
}
