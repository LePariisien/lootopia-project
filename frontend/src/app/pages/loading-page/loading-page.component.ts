import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LucideAngularModule, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.css',
  imports: [CommonModule, LucideAngularModule],
})
export class LoadingPageComponent implements OnInit, OnDestroy {
  readonly Sparkles = Sparkles;

  loadingText = 'Préparation de votre aventure';
  dots = '';
  private dotsInterval: any;
  private messageInterval: any;

  loadingMessages = [
    'Préparation de votre aventure',
    'Recherche des trésors cachés',
    'Mélange des indices secrets',
    'Activation de la boussole magique',
    'Chargement de la carte au trésor',
  ];

  progress = 0;

  ngOnInit(): void {
    this.dotsInterval = setInterval(() => {
      this.dots = this.dots === '...' ? '' : this.dots + '.';
    }, 500);

    this.messageInterval = setInterval(() => {
      const currentIndex = this.loadingMessages.indexOf(this.loadingText);
      const nextIndex = (currentIndex + 1) % this.loadingMessages.length;
      this.loadingText = this.loadingMessages[nextIndex];
    }, 2000);

    this.progress = 0;
    const interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 10;
      } else {
        clearInterval(interval);
      }
    }, 300);
  }

  ngOnDestroy(): void {
    clearInterval(this.dotsInterval);
    clearInterval(this.messageInterval);
  }
}
