import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';

interface PaymentDto {
  clientSecret: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number): Observable<PaymentDto> {
    return this.http.post<PaymentDto>(
      ApiRoutes.createPaymentIntent(amount),
      {}
    );
  }
}
