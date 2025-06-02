import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeCheckoutComponent } from './stripe-checkout.component';

@Component({
  selector: 'app-stripe-modal',
  standalone: true,
  imports: [CommonModule, StripeCheckoutComponent],
  template: `
    <div *ngIf="show && clientSecret" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100"></div>
    <div class="relative bg-white p-12 rounded-3xl shadow-2xl w-full max-w-2xl">
        <button
          class="absolute top-4 right-4 text-gray-400 hover:text-green-700 transition"
          (click)="close()"
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="mb-6 text-center">
          <div class="text-green-900 text-2xl font-extrabold mb-2">
            Paiement de {{ selectedPrice }}
          </div>
          <div class="text-gray-500 text-base mb-4">
            Entrez vos informations de carte bancaire pour finaliser l’achat.
          </div>
        </div>
        <app-stripe-checkout
          [clientSecret]="clientSecret"
          (paymentSuccess)="onPaymentSuccess()"
        ></app-stripe-checkout>
        <div class="mt-6 text-center text-xs text-gray-400">
          Paiement sécurisé par <span class="font-semibold text-green-700">Stripe</span>. <br>
          Vos informations bancaires ne sont jamais stockées sur nos serveurs.
        </div>
      </div>
    </div>
  `
})
export class StripeModalComponent {
  @Input() show = false;
  @Input() clientSecret!: string | null;
  @Input() selectedPrice!: string | null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() paymentSuccess = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  onPaymentSuccess() {
    this.paymentSuccess.emit();
  }
}