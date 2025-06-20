import { Component } from '@angular/core';
import { ArrowRight, Calendar, Clock, LucideAngularModule, MapPin, Share2, Star, Trophy, Users } from 'lucide-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TreasureHunt } from '../../models/treasure-hunt.model';
import { Treasure } from '../../models/treasure.model';
import { TreasureHuntService } from '../../services/treasure-hunt.service';
import { TreasureService } from '../../services/treasure.service';
import { ParticipationService } from '../../services/participation.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HuntDetailOpinionComponent } from "../../components/hunt-detail/hunt-detail-opinion/hunt-detail-opinion.component";
import { HuntDetailOrganizerComponent } from "../../components/hunt-detail/hunt-detail-organizer/hunt-detail-organizer.component";
import { Player } from '../../models/player.model';
import { PlayerService } from '../../services/player.service';
import { HuntDetailContentComponent } from "../../components/hunt-detail/hunt-detail-content/hunt-detail-content.component";
import { HuntDetailJoinComponent } from "../../components/hunt-detail/hunt-detail-join/hunt-detail-join.component";
import { Alert } from '../../models/alert.model';
import { AlertComponent } from "../../components/alert/alert.component";
import { Participation } from '../../models/participation.model';

@Component({
  selector: 'app-hunt-detail-page',
  imports: [
    LucideAngularModule,
    CommonModule,
    HuntDetailOpinionComponent,
    HuntDetailOrganizerComponent,
    HuntDetailContentComponent,
    HuntDetailJoinComponent,
    AlertComponent
],
  templateUrl: './hunt-detail-page.component.html',
  styleUrl: './hunt-detail-page.component.css'
})
export class HuntDetailPageComponent {
  readonly MapPin = MapPin;
  readonly Clock = Clock;
  readonly Trophy = Trophy;
  readonly Users = Users;
  readonly Star = Star;
  readonly ArrowRight = ArrowRight;
  readonly Share2 = Share2;
  readonly Calendar = Calendar;

  treasureHuntId: string | null = null;
  treasureHunt!: TreasureHunt;
  treasure!: Treasure;
  organizer!: Player;
  participation!: Participation | null;
  isRegistered: boolean = false;
  token: string | null = null;
  alert: Alert = { type: 'success', message: '' };

  constructor(private route: ActivatedRoute,
              private treasureHuntService: TreasureHuntService,
              private treasureService: TreasureService,
              private participationService: ParticipationService,
              private playerService: PlayerService,
              private authService: AuthService,
              private router: Router
  ) {
    this.treasureHuntId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    const token = this.authService.getTokenOrRedirect();
    if (!token) return;

    if (this.treasureHuntId) {
      this.treasureHuntService.getTreasureHunt(+this.treasureHuntId!).subscribe({
        next: (treasureHunt) => {
          this.treasureHunt = treasureHunt;
          console.log('Chasse au trésor récupérée :', this.treasureHunt);

          this.getOrganizer(treasureHunt.organizer_id);

          this.treasureService.getTreasure(treasureHunt.treasure_id).subscribe({
            next: (treasure) => {
              this.treasure = treasure;
              console.log('Trésor récupéré :', this.treasure);

              this.participationService.getParticipationByTreasureHuntIdAndPlayer(this.treasureHuntId!).subscribe({
                next: (participation) => {
                  console.log('Participation récupérée :', participation);
                  this.participation = participation;
                  this.isRegistered = participation && participation.length > 0;
                },
                error: (err) => {
                  console.error('Erreur lors de la récupération de la participation', err);
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
          this.router.navigate(['/404']);
        }
      })
    }
  };

  getOrganizer(organizerId: string): void {
    this.playerService.getPlayerById(organizerId).subscribe({
      next: (player) => {
        this.organizer = player;
        console.log('Organisateur récupéré :', this.organizer);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'organisateur', err);
      }
    });
  }

  setAlert(alert: Alert) {
    this.alert = alert;
    setTimeout(() => {
      this.alert = { type: 'success', message: '' };
    }, 4000);
  }

}
