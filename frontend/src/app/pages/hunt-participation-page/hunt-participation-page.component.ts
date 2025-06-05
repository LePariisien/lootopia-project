import { Component, Output } from '@angular/core';
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

  TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2NyZWF0aW9uX3RpbWVzdGFtcCI6IjIwMjUtMDUtMjZUMjI6NTU6NDIuNzc2NDE3IiwidXNlcl9pZCI6IjFhZDExNmY2LTBiMTUtNDYyYS1iYmMzLTBiZWEzMTdiNGFjOCIsImVtYWlsIjoibWFyY2VsaW5zeWRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzMnlfbWNsIiwic3ViIjoiczJ5X21jbCIsImlhdCI6MTc0OTE1MDgxMSwiZXhwIjoxNzQ5MTU0NDExfQ.L9vSaFPO4f0pzF-lr6v8uideV-Czi1yTAZ5wrS6oYpc";

  @Output() latitude!: number;
  @Output() longitude!: number;

  participation!: Participation;
  treasureHunt!: TreasureHunt;
  treasure!: Treasure;
  clues!: Clue[];
  step!: number;
  watchId: number | null = null;

  constructor(
    private participationService: ParticipationService,
    private treasureHuntService: TreasureHuntService,
    private treasureService: TreasureService,
    private clueService: ClueService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.startLocationWatch();

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

  startLocationWatch(): void {
    if ('geolocation' in navigator) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        },
        (error) => {
          console.error('Erreur de géolocalisation :', error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 30000 }
      );
    } else {
      console.error('La géolocalisation n\'est pas supportée par ce navigateur.');
    }
  }

  ngOnDestroy(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

}
