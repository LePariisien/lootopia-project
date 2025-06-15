import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreasureHuntService } from '../services/treasure-hunt.service';
import { Subscription } from 'rxjs';
import { ArrowLeft, ArrowRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [CommonModule, LucideAngularModule],
})
export class HomepageComponent implements OnInit, OnDestroy {
  readonly ArrowLeft = ArrowLeft;
  readonly ArrowRight = ArrowRight;
  hunts: any[] = [];
  current = 0;
  intervalId: any;
  search: string = '';
  private huntSub?: Subscription;

  treasureHuntImages: { [id: number]: string } = {
    5: 'assets/images/hunt/chatelet-paysage.jpg',
    6: 'assets/images/hunt/lyon-paysage.jpeg',
    7: 'assets/images/hunt/toulouse-paysage.jpg',
    8: 'assets/images/hunt/paris-paysage.jpg',
    10: 'assets/images/hunt/catacombe-paysage.jpg',
  };

  constructor(private treasureHuntService: TreasureHuntService) {}

  ngOnInit() {
    this.huntSub = this.treasureHuntService.getAllTreasureHunts().subscribe({
      next: (data) => {
        this.hunts = data.map(hunt => ({
          img: this.treasureHuntImages[Number(hunt.id)],
          name: hunt.name,
          info: hunt.description,
          difficulty: this.getDifficultyLabel(hunt.level),
          location: hunt.treasure?.address || 'Inconnue',
          reward: hunt.found ? 'Trouvée !' : 'À découvrir'
        }));
        this.startAutoSlide();
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    this.huntSub?.unsubscribe();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.current = (this.current + 1) % this.hunts.length;
    }, 5000);
  }

  restartAutoSlide() {
    clearInterval(this.intervalId);
    this.startAutoSlide();
  }

  nextCard() {
    this.current = (this.current + 1) % this.hunts.length;
    this.restartAutoSlide();
  }

  prevCard() {
    this.current = (this.current - 1 + this.hunts.length) % this.hunts.length;
    this.restartAutoSlide();
  }

  getCardClass(i: number): string {
    if (i === this.current) {
      return 'z-20 scale-110 shadow-2xl left-1/2 -translate-x-1/2';
    }
    if (i === (this.current - 1 + this.hunts.length) % this.hunts.length) {
      return 'z-10 scale-95 opacity-70 blur-[2px] left-1/4 -translate-x-1/2';
    }
    if (i === (this.current + 1) % this.hunts.length) {
      return 'z-10 scale-95 opacity-70 blur-[2px] left-3/4 -translate-x-1/2';
    }
    return 'z-0 scale-90 opacity-0 pointer-events-none';
  }

  getDifficultyLabel(level: number): string {
    switch (level) {
      case 1: return 'Facile';
      case 2: return 'Moyenne';
      case 3: return 'Difficile';
      default: return 'Inconnue';
    }
  }

  onSearchChange(search: string) {
    this.search = search;
  }
}
