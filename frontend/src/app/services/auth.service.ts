import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/login';
  private verifyMfaUrl = 'http://localhost:8080/api/auth/verify-mfa';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password });
  }

  verifyMfa(username: string, mfaCode: string): Observable<any> {
    return this.http.post(this.verifyMfaUrl + `?username=${username}&mfaCode=${mfaCode}`, {});
  }
}
