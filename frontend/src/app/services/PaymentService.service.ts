import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PaymentDto {
  clientSecret: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = 'http://localhost:8082/api/payment';

  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number): Observable<PaymentDto> {
    return this.http.post<PaymentDto>(
      `${this.apiUrl}/create-payment-intent?amount=${amount}`,
      {}
    );
  }
}