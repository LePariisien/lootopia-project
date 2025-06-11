import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';

@Injectable({ providedIn: 'root' })
export class ShopService {
  constructor(private http: HttpClient) {}

  addCrownsToPlayer(token: string, playerId: string, quantity: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(ApiRoutes.addCrownsToPlayer(), { player_id: playerId, quantity }, { headers });
  }

  createPurchase(token: string, purchase: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(ApiRoutes.createPurchase(), purchase, { headers });
  }

  getCrownQuantity(token: string, playerId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(ApiRoutes.getCrownQuantity(playerId), { headers });
  }
}