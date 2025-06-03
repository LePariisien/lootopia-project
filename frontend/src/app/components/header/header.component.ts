import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ShoppingCart, House, Medal, Search, User, MessageCircleMore } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [RouterLink, LucideAngularModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly ShoppingCart = ShoppingCart;
  readonly House = House;
  readonly Medal = Medal;
  readonly Search = Search;
  readonly User = User;
  readonly MessageCircleMore = MessageCircleMore;

  constructor(public router: Router) {}
}
