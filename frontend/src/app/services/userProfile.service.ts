import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfileById(token: string, userId: string): Observable<UserProfile> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<UserProfile>(ApiRoutes.userProfile(userId), { headers });
  }

  getUserProfileByPlayerId(token: string, playerId: string): Observable<UserProfile> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<UserProfile>(ApiRoutes.userProfileByPlayerId(playerId), { headers });
  }

}
