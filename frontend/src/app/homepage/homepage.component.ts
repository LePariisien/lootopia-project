import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { SearchBarComponent } from './search-bar/search-bar.component';
@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [CommonModule, HeaderComponent, SearchBarComponent],
})
export class HomepageComponent implements OnInit, OnDestroy {
  hunts = [
    {
      img: 'assets/logo-lootopia.png',
      name: 'Nom de la chasse 1',
      info: 'Infos sur la chasse aux trésors',
      difficulty: 'Facile',
      location: 'Paris',
      reward: '100 couronnes'
    },
    {
      img: 'assets/logo-lootopia.png',
      name: 'Nom de la chasse 2',
      info: 'Infos sur la chasse aux trésors',
      difficulty: 'Moyenne',
      location: 'Lyon',
      reward: 'Artefact rare'
    },
    {
      img: 'assets/logo-lootopia.png',
      name: 'Nom de la chasse 3',
      info: 'Infos sur la chasse aux trésors',
      difficulty: 'Difficile',
      location: 'Marseille',
      reward: 'Badge exclusif'
    },
    {
      img: 'assets/logo-lootopia.png',
      name: 'Nom de la chasse 4',
      info: 'Infos sur la chasse aux trésors',
      difficulty: 'Difficile',
      location: 'Marseille',
      reward: 'Badge exclusif'
    }
  ];

  current = 0;
  direction: 1 | -1 = 1;
  intervalId: any;
  search: string = '';

  ngOnInit() {
    this.startAutoSlide();
  }

  onSearchChange(search: string) {
    this.search = search;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.current += this.direction;
      if (this.current >= this.hunts.length - 1) {
        this.current = this.hunts.length - 1;
        this.direction = -1;
      } else if (this.current <= 0) {
        this.current = 0;
        this.direction = 1;
      }
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
}
