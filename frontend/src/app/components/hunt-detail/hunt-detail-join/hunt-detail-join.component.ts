import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Users, Share2, Clock, Calendar, Star, ArrowRight } from 'lucide-angular';
import { TreasureHunt } from '../../../models/treasure-hunt.model';
import { CommonModule } from '@angular/common';
import { ParticipationService } from '../../../services/participation.service';
import { AuthService } from '../../../services/auth.service';
import { Alert } from '../../../models/alert.model';
import { Router } from '@angular/router';
import { Participation } from '../../../models/participation.model';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-hunt-detail-join',
  imports: [
    LucideAngularModule,
    CommonModule
],
  templateUrl: './hunt-detail-join.component.html',
  styleUrl: './hunt-detail-join.component.css'
})
export class HuntDetailJoinComponent {
  readonly Users = Users;
  readonly Share2 = Share2;
  readonly Clock = Clock;
  readonly Calendar = Calendar;
  readonly Star = Star;
  readonly ArrowRight = ArrowRight;

  @Input() playerId!: string | null;
  @Input() treasureHunt!: TreasureHunt;
  @Input() participation!: Participation | null;
  @Input() isRegistered: boolean = false;
  @Input() name: TreasureHunt['name'] = '';

  @Output() isRegisteredChange = new EventEmitter<boolean>();
  @Output() alert = new EventEmitter<Alert>();

  constructor(
    private participationService: ParticipationService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  joinTreasureHunt(): void {
    if (!this.isRegistered) {
      this.participationService.createParticipation(this.treasureHunt.id).subscribe({
        next: (response) => {
          this.notificationService.createNotification({
              playerId: this.playerId!,
              message: `Vous avez rejoint la chasse au trésor "${this.treasureHunt.name}" !`,
              date: new Date(),
              read: false
          }).subscribe()
          this.isRegistered = true;
          this.isRegisteredChange.emit(true);
          this.alert.emit({ type: 'success', message: 'Participation enregistrée avec succès !' });
        },
        error: (error) => {
          console.error('Error creating participation:', error);
          this.alert.emit({ type: 'error', message: 'Impossible de participer à la chasse au trésor. Veuillez réessayer ultérieurement.' });
        }
      });
    } else {
      this.router.navigate(['/participation', this.participation?.id]);
    }
  }

  resumeParticipation(): void {
    this.router.navigate(['/participation', this.participation?.id]);
  }

}
