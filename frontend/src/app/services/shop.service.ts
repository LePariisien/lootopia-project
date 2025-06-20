import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiRoutes } from '../api-routes';
import { purchase } from '../models/purchase.model';

@Injectable({ providedIn: 'root' })
export class ShopService {
  private crownCountSubject = new BehaviorSubject<number | null>(null);
  crownCount$ = this.crownCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  addCrownsToPlayer(playerId: string, quantity: number): Observable<any> {
    return this.http.post(ApiRoutes.addCrownsToPlayer(), { player_id: playerId, quantity });
  }

  createPurchase(purchase: any): Observable<any> {
    return this.http.post(ApiRoutes.createPurchase(), purchase);
  }

  getCrownQuantity(): Observable<any> {
    return this.http.get(ApiRoutes.getCrownQuantity());
  }

  updateCrownCount(count: number) {
    this.crownCountSubject.next(count);
  }

  minusCrownsByToken(quantity: number): Observable<any> {
    return this.http.post(ApiRoutes.minusCrownsByToken(quantity), null);
  }

  getPurchasesByPlayerId(playerId: string): Observable<purchase> {
    return this.http.get<purchase>(ApiRoutes.getPurchasesByPlayerId(playerId));
  }
}
