import { Component } from '@angular/core';
import { HuntHeaderComponent } from "../../components/hunt-header/hunt-header.component";
import { HuntStepCardComponent } from "../../components/hunt-step-card/hunt-step-card.component";
import { HuntCompletedStepsComponent } from "../../components/hunt-completed-steps/hunt-completed-steps.component";
import { HuntSidebarComponent } from "../../components/hunt-sidebar/hunt-sidebar.component";
import { TreasureHunt } from '../../models/treasure-hunt.model';
import { Clue } from '../../models/clue.model';
import { Treasure } from '../../models/treasure.model';
import { Participation } from '../../models/participation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipationService } from '../../services/participation.service';
import { TreasureHuntService } from '../../services/treasure-hunt.service';
import { TreasureService } from '../../services/treasure.service';
import { ClueService } from '../../services/clue.service';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-hunt-participation-page',
  imports: [
    HuntHeaderComponent,
    HuntStepCardComponent,
    HuntCompletedStepsComponent,
    HuntSidebarComponent,
    HeaderComponent
  ],
  templateUrl: './hunt-participation-page.component.html',
  styleUrl: './hunt-participation-page.component.css'
})
export class HuntParticipationPageComponent {

  TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2NyZWF0aW9uX3RpbWVzdGFtcCI6IjIwMjUtMDUtMjZUMjI6NTU6NDIuNzc2NDE3IiwidXNlcl9pZCI6IjFhZDExNmY2LTBiMTUtNDYyYS1iYmMzLTBiZWEzMTdiNGFjOCIsImVtYWlsIjoibWFyY2VsaW5zeWRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzMnlfbWNsIiwic3ViIjoiczJ5X21jbCIsImlhdCI6MTc0ODUxNTcxNSwiZXhwIjoxNzQ4NTE5MzE1fQ.7ys63oSfpwCxrCdKHy5U6s2zXNhLHIiUxHn6txDVNeo";
  ID_USER = "0fbb229a-eb38-4a64-8e8d-c73e28487759";

  longitude: number = 0;
  latitude: number = 0;

  participation!: Participation;
  treasureHunt!: TreasureHunt;
  treasure!: Treasure;
  clues!: Clue[];
  step!: number;

  constructor(
    private participationService: ParticipationService,
    private treasureHuntService: TreasureHuntService,
    private treasureService: TreasureService,
    private clueService: ClueService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserLocation();

    this.route.paramMap.subscribe(params => {
      const participationId = params.get('id');
      if (participationId) {
        this.participationService.getParticipation(this.TOKEN, participationId).subscribe({
          next: (participation) => {
            this.participation = participation;
            this.step = (participation.current_step ?? 1) - 1;

            this.treasureHuntService.getTreasureHunt(this.TOKEN, participation.treasureHuntId).subscribe({
              next: (treasureHunt) => {
                this.treasureHunt = treasureHunt;

                this.treasureService.getTreasure(this.TOKEN, treasureHunt.treasure_id).subscribe({
                  next: (treasure) => {
                    this.treasure = treasure;

                    this.clueService.getCluesByTreasureId(this.TOKEN, treasure.id).subscribe({
                      next: (clues) => {
                        this.clues = clues;
                      },
                      error: (err) => {
                        console.error('Erreur lors de la récupération des indices', err);
                      }
                    });
                  },
                  error: (err) => {
                    console.error('Erreur lors de la récupération du trésor', err);
                  }
                });
              },
              error: (err) => {
                console.error('Erreur lors de la récupération de la chasse au trésor', err);
              }
            });
          },
          error: (err) => {
            console.error('Erreur lors de la récupération de la participation', err);
            this.router.navigate(['/404']);
          }
        });
      }
    });
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log('Latitude:', this.latitude, 'Longitude:', this.longitude);
        },
        (error) => {
          console.error('Erreur de géolocalisation :', error);
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas supportée par ce navigateur.');
    }
  }


}
