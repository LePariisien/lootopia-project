import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Crown, ShoppingCart, Info, CreditCard, Check } from 'lucide-angular';
import { PaymentService } from '../../services/PaymentService.service';
import { StripeModalComponent } from '../stripe/stripe-modal.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    StripeModalComponent
  ],
})
export class ShopComponent {
  readonly Crown = Crown;
  readonly ShoppingCart = ShoppingCart;
  readonly Info = Info;
  readonly CreditCard = CreditCard;
  readonly Check = Check;
  activeTab: 'couronnes' | 'abonnements' | 'artefacts' = 'couronnes';
  showStripe = false;
  clientSecret: string | null = null;
  selectedPrice: string | null = null;
  showSuccess = false;

  crownPacks = [
    { title: 'Pack Découverte', sub: "Pour débuter l'aventure", amount: 100, price: '4,99 €', priceValue: 4.99, oldPrice: '5,24€', discount: '-5%', img: 'assets/logo-pack-1.png'},
    { title: 'Pack Aventurier', sub: 'Le plus populaire', amount: 300, price: '12,99 €', priceValue: 12.99, oldPrice: '14,97 €', discount: '-10%', img: 'assets/logo-pack-2.png'},
    { title: 'Pack Explorateur', sub: 'Pour les passionnés', amount: 600, price: '29,99 €', priceValue: 29.99, oldPrice: '37,50 €', discount: '-20%', badge: 'MEILLEURE OFFRE', bonus: '+100', img: 'assets/logo-pack-3.png'},
    { title: 'Pack Trésorier', sub: 'Pour les collectionneurs', amount: 2000, price: '69,99 €', priceValue: 69.99, oldPrice: '100,00 €', discount: '-30%', bonus: '+500', img: 'assets/logo-pack-4.png'},
  ];

  constructor(private paymentService: PaymentService) {}

  selectTab(tab: 'couronnes' | 'abonnements' | 'artefacts') {
    this.activeTab = tab;
  }

  getPriceByAmount(amount: number): string | null {
    const pack = this.crownPacks.find(p => p.amount === amount);
    return pack ? pack.price : null;
  }

  buyCrowns(priceValue: number) {
    const pack = this.crownPacks.find(p => p.priceValue === priceValue);
    if (!pack) return;
    const priceInEur = Math.round(priceValue * 100);
    this.paymentService.createPaymentIntent(priceInEur).subscribe({
      next: (dto) => {
        this.clientSecret = dto.clientSecret;
        this.showStripe = true;
        this.selectedPrice = pack.price;
      },
      error: (err) => {
        alert('Erreur lors de la création du paiement : ' + err.message);
      }
    });
  }

  onPaymentSuccess() {
    this.showStripe = false;
    this.showSuccess = true;
    setTimeout(() => this.showSuccess = false, 4000);

  }
}
