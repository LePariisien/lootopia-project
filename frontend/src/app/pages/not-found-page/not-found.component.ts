import { Component } from '@angular/core';
import { LucideAngularModule, CircleX, Home, ChevronLeft } from 'lucide-angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [
    LucideAngularModule,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  readonly CircleX = CircleX;
  readonly Home = Home;
  readonly ChevronLeft = ChevronLeft;

  constructor(private router: Router, private location: Location) { }

  goHome() {
    this.router.navigate(['/']);
  }

  goBack() {
    this.location.back();
  }

}
