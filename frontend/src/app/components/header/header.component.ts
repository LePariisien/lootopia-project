import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ShoppingCart, House, Medal, Search, User, SquarePlus, LogOut, Bell } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { NgModule } from '@angular/core';
import { Player } from '../../models/player.model';
import { ShopService } from '../../services/shop.service';
import { Subscription, Subject } from 'rxjs';
import { PlayerService } from '../../services/player.service';
import { NotificationService, Notification } from '../../services/notification.service';
import { takeUntil } from 'rxjs/operators';

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
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly ShoppingCart = ShoppingCart;
  readonly House = House;
  readonly Medal = Medal;
  readonly Search = Search;
  readonly User = User;
  readonly SquarePlus = SquarePlus;
  readonly LogOut = LogOut;
  readonly Bell = Bell;

  isAuthenticated!: boolean;
  player!: Player;
  playerId: string | null = null;
  crownCount: number | null = null;
  crownCountSub!: Subscription;
  nickname: string | null = null;
  encodedNickname: string | null = null;
  showNotifications = false;
  hideTimeout: any;
  notifications: Notification[] = [];
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService,
    public router: Router,
    private shopService: ShopService,
    private playerService: PlayerService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.playerId = this.authService.getPlayerId() || null;
    this.nickname = this.authService.getNickname() || null;
    this.encodedNickname = this.nickname ? encodeURIComponent(this.nickname) : null;

    if (this.playerId) {
      this.playerService.getPlayerById(this.playerId).subscribe({
        next: (player) => {
          this.player = player;
        },
        error: (err) => {
          console.error('Erreur  lors de la récupération du joueur:', err);
        }
      });

      this.shopService.getCrownQuantity().subscribe({
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

      this.notificationService.getNotificationsByPlayerId(this.playerId).subscribe({
        next: (notifs) => {
          this.notifications = notifs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
      });

      this.notificationService.notificationCreated$
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.notificationService.getNotificationsByPlayerId(this.playerId!).subscribe({
            next: (notifs) => {
              this.notifications = notifs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            }
          });
        });
    }
  }

  ngOnDestroy(): void {
    this.crownCountSub?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }

  hideNotificationsWithDelay() {
    this.hideTimeout = setTimeout(() => this.showNotifications = false, 200);
  }

  cancelHide() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.showNotifications = true;
  }
}
