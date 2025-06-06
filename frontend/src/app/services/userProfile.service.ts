import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile, Player } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/lootopia/api/users';

  constructor(private http: HttpClient) {}

  getProfile(userId: string): Observable<{ userProfile: UserProfile, player: Player }> {
    return this.http.get<{ userProfile: UserProfile, player: Player }>(
      `${this.apiUrl}/${userId}/profile`
    );
  }
}
