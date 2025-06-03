import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Participation } from '../models/participation.model';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class ParticipationService {
  constructor(private http: HttpClient) {}

  createParticipation(token: string, body: Participation): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(ApiRoutes.participation(), body, { headers });
  }

  getParticipation(token: string, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(ApiRoutes.participationById(id), { headers });
  }

}
