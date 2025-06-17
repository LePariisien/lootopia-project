import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';
import { ApiRoutes } from '../api-routes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfileById(userId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(ApiRoutes.userProfileByUserId(userId));
  }

  getUserProfileByPlayerId(playerId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(ApiRoutes.userProfileByPlayerId(playerId));
  }

}
