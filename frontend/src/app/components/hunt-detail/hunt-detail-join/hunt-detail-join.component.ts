import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Users, Share2, Clock, Calendar, Star, ArrowRight } from 'lucide-angular';
import { TreasureHunt } from '../../../models/treasure-hunt.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ParticipationService } from '../../../services/participation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-hunt-detail-join',
  imports: [LucideAngularModule, CommonModule],
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

  @Input() treasureHunt!: TreasureHunt;
  @Input() isRegistered: boolean = false;

  @Output() isRegisteredChange = new EventEmitter<boolean>();

  constructor(
    private participationService: ParticipationService,
    private router: Router,
    private authService: AuthService
  ) { }

  joinTreasureHunt(): void {
    const token = this.authService.getTokenOrRedirect();
    console.log('Joining treasure hunt with token:', token);
    if (!token) return;

    if (this.isRegistered) {
      this.participationService.createParticipation(token, this.treasureHunt.id).subscribe({
        next: (response) => {
          console.log('Participation created successfully:', response);
          this.isRegistered = true;
          this.isRegisteredChange.emit(true);
        },
        error: (error) => {
          console.error('Error creating participation:', error);
          alert('Failed to join the treasure hunt. Please try again later.');
        }
      });
    }
  }

}
