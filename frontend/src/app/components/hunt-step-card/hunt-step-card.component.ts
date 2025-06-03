import { Component, Input } from '@angular/core';
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
export class HuntStepCardComponent {
  readonly Bomb = Bomb;
  readonly Check = Check;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly Quote = Quote;
  readonly MapPin = MapPin;

  TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2NyZWF0aW9uX3RpbWVzdGFtcCI6IjIwMjUtMDUtMjZUMjI6NTU6NDIuNzc2NDE3IiwidXNlcl9pZCI6IjFhZDExNmY2LTBiMTUtNDYyYS1iYmMzLTBiZWEzMTdiNGFjOCIsImVtYWlsIjoibWFyY2VsaW5zeWRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzMnlfbWNsIiwic3ViIjoiczJ5X21jbCIsImlhdCI6MTc0ODUxNTcxNSwiZXhwIjoxNzQ4NTE5MzE1fQ.7ys63oSfpwCxrCdKHy5U6s2zXNhLHIiUxHn6txDVNeo";
  ID_USER = "0fbb229a-eb38-4a64-8e8d-c73e28487759";

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
    if (!this.clues || !this.participation) return;
    this.updateClue();
    this.step = (this.participation.current_step ?? 1);
  }

  previousStep(): void {
    if (this.step > 0) {
      this.step--;
    }
  }
  nextStep(): void {
    if (this.step < this.clues.length) {
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

    this.treasureHuntService.digAHole(this.TOKEN, this.treasureHunt.id, this.treasure.latitude, this.treasure.longitude).subscribe({
      next: (response) => {
        console.log('Response: ', response);
        this.clues[this.step].solved = true;
        this.nextStep();
        alert('Vous avez trouvé un indice / trésor !');
      },
      error: (err) => {
        alert('Erreur lors de la publication de la chasse au trésor. Veuillez réessayer.');
        console.error('Erreur lors de la publication', err);
      }
    });

  }

}
