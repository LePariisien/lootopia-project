import { Component, Input } from '@angular/core';
import { LucideAngularModule, Medal, Star } from 'lucide-angular';
import { Player } from '../../../models/player.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hunt-detail-organizer',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './hunt-detail-organizer.component.html',
  styleUrl: './hunt-detail-organizer.component.css'
})
export class HuntDetailOrganizerComponent {
  readonly Star = Star;
  readonly Medal = Medal;

  @Input() organizer!: Player;

  constructor(private router: Router) {}

  viewProfile(playerId: string): void {
    this.router.navigate(['/profile', playerId]);
  }

}
