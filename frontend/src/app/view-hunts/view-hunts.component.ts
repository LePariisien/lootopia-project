import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreasureHuntService } from '../services/treasure-hunt.service';
import { TreasureHunt } from '../models/treasure-hunt.model';
import { Clue } from '../models/clue.model';
import { FormsModule } from '@angular/forms';
import { HuntFilterPipe } from './hunt-filter.pipe';
import { HeaderComponent } from '../components/header/header.component';
import { TreasureService } from '../services/treasure.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-hunts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HuntFilterPipe,
    HeaderComponent
],
  templateUrl: './view-hunts.component.html',
  styleUrls: ['./view-hunts.component.css']
})
export class ViewHuntsComponent implements OnInit {
  hunts: TreasureHunt[] = [];
  clues: Clue[] = [];
  loading = true;
  search = '';
  difficulty = '';
  city = '';

    treasureHuntImages: { [id: number]: string } = {
    5: 'assets/images/hunt/chatelet-paysage.jpg',
    6: 'assets/images/hunt/lyon-paysage.jpeg',
    7: 'assets/images/hunt/toulouse-paysage.jpg',
    8: 'assets/images/hunt/paris-paysage.jpg',
    10: 'assets/images/hunt/catacombe-paysage.jpg',
  };

  constructor(private huntService: TreasureHuntService,
    private treasureService: TreasureService,
    private router: Router) {}

  ngOnInit() {
    this.huntService.getAllTreasureHunts().subscribe({
      next: (data) => {
        console.log('Hunts data received:', data);
        this.hunts = data;
        data.forEach(element => {
          this.treasureService.getTreasureDetails(element.treasure_id).subscribe({
            next: (treasure) => {
              element.treasure = treasure;
              console.log('Treasure details for hunt', element.treasure_id, ':', treasure);
              this.hunts = this.hunts.map(hunt =>
                hunt.treasure_id === element.treasure_id ? { ...hunt, treasure } : hunt)
            },
            error: (err) => console.error('Error fetching treasure details:', err)
          });
        });
        this.loading = false;

      },
      error: () => this.loading = false
    });
  }

  goTreasureHunt(id: number) {
    this.router.navigate(['/hunt', id]);
  }

}
