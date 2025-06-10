import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ShoppingCart, House, Medal, Search, User, SquarePlus, LogOut, Bell } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { NgModule } from '@angular/core';

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
export class HeaderComponent {
  readonly ShoppingCart = ShoppingCart;
  readonly House = House;
  readonly Medal = Medal;
  readonly Search = Search;
  readonly User = User;
  readonly SquarePlus = SquarePlus;
  readonly LogOut = LogOut;
  readonly Bell = Bell;

  isAuthenticated!: boolean;

  constructor(private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
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
