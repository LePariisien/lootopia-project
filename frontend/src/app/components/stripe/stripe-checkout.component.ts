import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-stripe-checkout',
  imports: [CommonModule],
  template: `
    <div *ngIf="clientSecret">
      <form (submit)="handleSubmit($event)">
        <div id="card-element"></div>
        <button type="submit" [disabled]="loading" class="shop-pack-btn mt-4">
          Payer
        </button>
      </form>
      <div *ngIf="error" class="text-red-500 mt-2">{{ error }}</div>
    </div>
  `
})
export class StripeCheckoutComponent implements OnInit, OnDestroy {
  @Input() clientSecret!: string;
  @Output() paymentSuccess = new EventEmitter<void>();
  stripe!: Stripe | null;
  elements!: StripeElements | null;
  card!: StripeCardElement | null;
  error: string | null = null;
  loading = false;

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51RR8h42Rvedpd9OjOhIM5048x4uorLEyxhrHK7eT0eYO79IeWq7nZTiHjRu5gv6zlftv5ZyhTyDHBqfIAkTzzdGj00q9f0PWAZ');
    this.elements = this.stripe?.elements() || null;
    this.card = this.elements?.create('card') || null;
    this.card?.mount('#card-element');
  }

  ngOnDestroy() {
    this.card?.unmount();
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.error = null;
    if (!this.stripe || !this.card) return;

    const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: { card: this.card }
    });

    this.loading = false;

    if (error) {
      this.error = error.message ?? 'Erreur de paiement';
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      this.paymentSuccess.emit();
    }
  }
}