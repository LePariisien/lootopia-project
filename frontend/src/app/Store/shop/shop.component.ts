import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Crown, ShoppingCart, Info, CreditCard } from 'lucide-angular';
import { PaymentService } from '../../services/PaymentService.service';
import { StripeModalComponent } from '../../components/stripe/stripe-modal.component';
import { Alert } from '../../models/alert.model';
import { AlertComponent } from "../../components/alert/alert.component";
import { AuthService } from '../../services/auth.service';
import { ShopService } from '../../services/shop.service';
import { CrownBalanceComponent } from '../../components/crown-balance/crown-balance.component';
import { Player } from '../../models/player.model';
import { ArtefactsTabComponent } from './artefacts-tab/artefacts-tab.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    StripeModalComponent,
    AlertComponent,
    CrownBalanceComponent,
    ArtefactsTabComponent,
  ],
})
export class ShopComponent implements OnInit {
  readonly Crown = Crown;
  readonly ShoppingCart = ShoppingCart;
  readonly Info = Info;
  readonly CreditCard = CreditCard;
  activeTab: 'couronnes' | 'abonnements' | 'artefacts' = 'couronnes';
  showStripe = false;
  clientSecret: string | null = null;
  selectedPrice: string | null = null;
  crownCount: number | null = null;
  selectedPack: any = null;

  crownPacks = [
    { title: 'Pack Découverte', sub: "Pour débuter l'aventure", amount: 100, price: '4,99 €', priceValue: 4.99, oldPrice: '5,24 €', discount: '-5%', img: 'assets/images/shop/logo-pack-1.png'},
    { title: 'Pack Aventurier', sub: 'Le plus populaire', amount: 300, price: '12,99 €', priceValue: 12.99, oldPrice: '14,97 €', discount: '-10%', img: 'assets/images/shop/logo-pack-2.png'},
    { title: 'Pack Explorateur', sub: 'Pour les passionnés', amount: 600, price: '29,99 €', priceValue: 29.99, oldPrice: '37,50 €', discount: '-20%', badge: 'MEILLEURE OFFRE', bonus: '+100', img: 'assets/images/shop/logo-pack-3.png'},
    { title: 'Pack Trésorier', sub: 'Pour les collectionneurs', amount: 2000, price: '69,99 €', priceValue: 69.99, oldPrice: '100,00 €', discount: '-30%', bonus: '+500', img: 'assets/images/shop/logo-pack-4.png'},
  ];

  alert: Alert = { type: 'success', message: '' };

  player!: Player;
  playerId: string | null = null;

  constructor(
    private paymentService: PaymentService,
    public authService: AuthService,
    private shopService: ShopService
  ) {}

  ngOnInit() {
    this.playerId = this.authService.getPlayerId();

    if (this.playerId) {
      this.shopService.getCrownQuantity().subscribe({
        next: (crown) => {
          this.crownCount = crown.quantity;
        },
        error: (err) => {
          console.error('Erreur Crown API:', err);
        }
      });
    }
  }

  selectTab(tab: 'couronnes' | 'abonnements' | 'artefacts') {
    this.activeTab = tab;
  }

  getPriceByAmount(amount: number): string | null {
    const pack = this.crownPacks.find(p => p.amount === amount);
    return pack ? pack.price : null;
  }

  buyCrowns(priceValue: number) {
    if (!this.authService.isAuthenticated()) {
      this.setAlert({ type: 'warning', message: 'Veuillez vous connecter pour acheter des couronnes.' });
      return;
    }

    const pack = this.crownPacks.find(p => p.priceValue === priceValue);
    if (!pack) return;
    this.selectedPack = pack;
    const priceInEur = Math.round(priceValue * 100);
    this.paymentService.createPaymentIntent(priceInEur).subscribe({
      next: (dto) => {
        this.clientSecret = dto.clientSecret;
        this.showStripe = true;
        this.selectedPrice = pack.price;
      },
      error: (err) => {
        this.setAlert({ type: 'error', message: 'Erreur lors de la création du paiement : ' + err.message });
        console.error('Erreur lors de la création du PaymentIntent:', err);
      }
    });
  }

  onPaymentSuccess() {
    this.showStripe = false;

    if (this.selectedPack && typeof this.selectedPack.amount === 'number') {
      let total = this.selectedPack.amount;
      if (this.selectedPack.bonus) {
        const bonus = parseInt(this.selectedPack.bonus.replace('+', ''), 10);
        if (!isNaN(bonus)) total += bonus;
      }
      this.crownCount = (this.crownCount ?? 0) + total;

      if (this.playerId) {
        this.shopService.addCrownsToPlayer(this.playerId, total).subscribe();
        const now = new Date();
        const purchase = {
          player_id: this.playerId,
          crowns: total,
          price: this.selectedPack.priceValue,
          date: now,
          title: this.selectedPack.title,
          sub: this.selectedPack.sub,
          oldPrice: this.selectedPack.oldPrice,
          discount: this.selectedPack.discount,
          badge: this.selectedPack.badge,
          bonus: this.selectedPack.bonus,
          img: this.selectedPack.img
        };
        this.shopService.createPurchase(purchase).subscribe({
          next: () => {
            this.setAlert({ type: 'success', message: 'Paiement validé !' });
            this.shopService.updateCrownCount(this.crownCount ?? 0);
          },
          error: (err) => {
            console.error('Erreur lors de l\'enregistrement de l\'achat:', err);
          }
        });
      }
    }
  }

  onCrownCountChange(newCount: number) {
    this.crownCount = newCount;
    this.shopService.updateCrownCount(this.crownCount ?? 0);
  }

  setAlert(alert: Alert) {
    this.alert = alert;
    setTimeout(() => {
      this.alert = { type: 'success', message: '' };
    }, 4000);
  }

}
