import { Component, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ShoppingCart, House, Medal, Search, User, SquarePlus, LogOut, Bell } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { NgModule } from '@angular/core';
import { Player } from '../../models/player.model';
import { ShopService } from '../../services/shop.service';
import { Subscription } from 'rxjs';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class MainLayoutModule { }

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    LucideAngularModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy {
  readonly ShoppingCart = ShoppingCart;
  readonly House = House;
  readonly Medal = Medal;
  readonly Search = Search;
  readonly User = User;
  readonly SquarePlus = SquarePlus;
  readonly LogOut = LogOut;
  readonly Bell = Bell;

  isAuthenticated!: boolean;
  token: string = '';
  player!: Player;
  playerId: string | null = null;
  crownCount: number | null = null;
  crownCountSub!: Subscription;

  constructor(private authService: AuthService,
    public router: Router,
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.token = this.authService.getToken() ?? '';
    this.playerId = this.authService.getPlayerId() || null;

    if (this.token) {
      this.shopService.getCrownQuantity(this.token, "").subscribe({
        next: (crown) => {
          this.crownCount = crown.quantity;
          this.shopService.updateCrownCount(crown.quantity);
        },
        error: (err) => {
          console.error('Erreur Crown API:', err);
        }
      });

      this.crownCountSub = this.shopService.crownCount$.subscribe(count => {
        if (count !== null) this.crownCount = count;
      });
    }
  }

  ngOnDestroy(): void {
    this.crownCountSub?.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }

  openNotifications(): void {
    // Logic to open notifications
    console.log('Notifications opened');
  }

}
