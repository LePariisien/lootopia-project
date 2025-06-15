import { Component, Input } from '@angular/core';
import { LucideAngularModule, MapPin, Clock, Trophy, Users } from 'lucide-angular';
import { TreasureHunt } from '../../../models/treasure-hunt.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hunt-detail-content',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './hunt-detail-content.component.html',
  styleUrl: './hunt-detail-content.component.css'
})
export class HuntDetailContentComponent {
  readonly MapPin = MapPin;
  readonly Clock = Clock;
  readonly Trophy = Trophy;
  readonly Users = Users;

  @Input() treasureHunt!: TreasureHunt;

}
