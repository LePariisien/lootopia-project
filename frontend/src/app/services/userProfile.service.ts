import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/lootopia/api/users';

  constructor(private http: HttpClient) {}

 getProfile(userId: string): Observable<UserProfile> {
  return this.http.get<UserProfile>(`${this.apiUrl}/${userId}/profile`);
}

}
