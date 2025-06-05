import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Crown, ShoppingCart, Info, CreditCard, Check, XCircle } from 'lucide-angular';
import { PaymentService } from '../../services/PaymentService.service';
import { StripeModalComponent } from '../../components/stripe/stripe-modal.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { ShopService } from '../../services/shop.service';
import { CrownBalanceComponent } from '../../components/crown-balance/crown-balance.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    StripeModalComponent,
    HeaderComponent,
    CrownBalanceComponent,
  ],
})
export class ShopComponent implements OnInit {
  readonly Crown = Crown;
  readonly ShoppingCart = ShoppingCart;
  readonly Info = Info;
  readonly CreditCard = CreditCard;
  readonly Check = Check;
  readonly XCircle = XCircle;
  activeTab: 'couronnes' | 'abonnements' | 'artefacts' = 'couronnes';
  showStripe = false;
  clientSecret: string | null = null;
  selectedPrice: string | null = null;
  showSuccess = false;
  crownCount: number | null = null;
  selectedPack: any = null;
  showError: boolean = false;

  crownPacks = [
    { title: 'Pack Découverte', sub: "Pour débuter l'aventure", amount: 100, price: '4,99 €', priceValue: 4.99, oldPrice: '5,24 €', discount: '-5%', img: 'assets/images/shop/logo-pack-1.png'},
    { title: 'Pack Aventurier', sub: 'Le plus populaire', amount: 300, price: '12,99 €', priceValue: 12.99, oldPrice: '14,97 €', discount: '-10%', img: 'assets/images/shop/logo-pack-2.png'},
    { title: 'Pack Explorateur', sub: 'Pour les passionnés', amount: 600, price: '29,99 €', priceValue: 29.99, oldPrice: '37,50 €', discount: '-20%', badge: 'MEILLEURE OFFRE', bonus: '+100', img: 'assets/images/shop/logo-pack-3.png'},
    { title: 'Pack Trésorier', sub: 'Pour les collectionneurs', amount: 2000, price: '69,99 €', priceValue: 69.99, oldPrice: '100,00 €', discount: '-30%', bonus: '+500', img: 'assets/images/shop/logo-pack-4.png'},
  ];

  constructor(
    private paymentService: PaymentService,
    public authService: AuthService,
    private shopService: ShopService
  ) {}

  ngOnInit() {
    // --- SIMULATION (à commenter pour la vraie méthode) ---
    // localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2NyZWF0aW9uX3RpbWVzdGFtcCI6IjIwMjUtMDYtMDFUMjE6NDA6MjIuMzg5OTY2IiwidXNlcl9pZCI6ImE5ODczYTYxLThjZTUtNGFmYS04NzlkLTE1YWY0ODdkMDY2MSIsImVtYWlsIjoiYWxleGFuZHJlY2FubzkzMDZAZ21haWwuY29tIiwidXNlcm5hbWUiOiJhbGV4Iiwic3ViIjoiYWxleCIsImlhdCI6MTc0OTE0Nzg2MSwiZXhwIjoxNzQ5MTUxNDYxfQ.TJQHRJAlsSGdgWpfc6K_gQqlWlA0IglJ2h4lrkFtnF8');
    // const token = localStorage.getItem('accessToken')!;
    // const playerId = '02bede4a-2792-436b-b81d-5daa21819e04';

    // --- VRAIE MÉTHODE ---
    const token = localStorage.getItem('accessToken');
    let playerId: string | null = null;
    if (this.authService.currentUser) {
      playerId = this.authService.currentUser.player_id;
    }
    if (token && playerId) {
      this.shopService.getCrownQuantity(token, playerId).subscribe({
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
    if (!this.authService.isLoggedIn()) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
        window.location.href = '/login';
      }, 4000);
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
        console.error('Erreur lors de la création du PaymentIntent:', err);
      }
    });
  }

  onPaymentSuccess() {
    this.showStripe = false;
    this.showSuccess = true;
    if (this.selectedPack && typeof this.selectedPack.amount === 'number') {
      let total = this.selectedPack.amount;
      if (this.selectedPack.bonus) {
        const bonus = parseInt(this.selectedPack.bonus.replace('+', ''), 10);
        if (!isNaN(bonus)) total += bonus;
      }
      this.crownCount = (this.crownCount ?? 0) + total;

      // --- SIMULATION (à commenter pour la vraie méthode) ---
      // const token = localStorage.getItem('accessToken')!;
      // const playerId = '02bede4a-2792-436b-b81d-5daa21819e04';

      // --- VRAIE MÉTHODE ---
      const token = localStorage.getItem('accessToken');
      let playerId: string | null = null;
      if (this.authService.currentUser) {
        playerId = this.authService.currentUser.player_id;
      }
      if (token && playerId) {
        this.shopService.addCrownsToPlayer(token, playerId, total).subscribe();
        const now = new Date();
        const purchase = {
          player_id: playerId,
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
        this.shopService.createPurchase(token, purchase).subscribe();
      }
    }
    setTimeout(() => this.showSuccess = false, 4000);
  }
}
