import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TreasureHunt } from '../../models/treasure-hunt.model';
import { Treasure } from '../../models/treasure.model';
import { Clue } from '../../models/clue.model';
import { Participation } from '../../models/participation.model';
import { LucideAngularModule, Bomb, ChevronLeft, ChevronRight, Quote, MapPin, Check } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
import { TreasureHuntService } from '../../services/treasure-hunt.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hunt-step-card',
  imports: [
    LucideAngularModule,
    CommonModule
  ],
  templateUrl: './hunt-step-card.component.html',
  styleUrl: './hunt-step-card.component.css'
})
export class HuntStepCardComponent implements OnChanges {
  readonly Bomb = Bomb;
  readonly Check = Check;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly Quote = Quote;
  readonly MapPin = MapPin;

  @Input() TOKEN!: string;

  @Input() step!: number;
  @Input() treasureHunt!: TreasureHunt;
  @Input() treasure!: Treasure;
  @Input() clues!: Clue[];
  @Input() participation!: Participation;
  @Input() longitude!: number;
  @Input() latitude!: number;

  constructor(private http: HttpClient,
    private treasureHuntService: TreasureHuntService) { }

  ngOnInit(): void {
    this.clues = this.clues || [];

    if (!this.clues || !this.participation) return;
    this.updateClue();
    this.step = (this.participation.current_step ?? 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitude'] || changes['longitude']) {
      this.treasure.latitude = this.latitude;
      this.treasure.longitude = this.longitude;
    }
  }

  previousStep(): void {
    if (this.step > 0) {
      this.step--;
    }
  }
  nextStep(): void {
    if (this.step < this.clues?.length) {
      this.step++;
    }
  }

  updateClue(): void {
    if (!this.clues || !this.participation) return;
    this.clues.forEach(clue => {
      if (clue.step <= this.participation.current_step) {
        clue.solved = true;
      }
    });
  }

  solveStep(): void {
    if (!this.clues || !this.participation) return;

    this.treasureHuntService.digAHole(this.TOKEN, this.treasure.id, this.treasure.latitude, this.treasure.longitude).subscribe({
      next: (response: any) => {
        const foundClue = response.clues && response.clues.some((clue: any) => clue.step === this.step);
        const foundTreasure = response.treasures && response.treasures.length > 0;

        if (foundClue) {
          this.clues[this.step].solved = true;
          this.nextStep();
          alert('Vous avez trouvé un indice !');
        } else if (foundTreasure) {
          alert('Vous avez trouvé le trésor !');
        } else {
          alert('Aucun trésor ou indice trouvé dans cette zone.');
        }
      },
      error: (err) => {
        alert(err.error?.message || 'Erreur lors de la fouille');
        console.error('Erreur lors de la publication', err);
      }
    });

  }

}
