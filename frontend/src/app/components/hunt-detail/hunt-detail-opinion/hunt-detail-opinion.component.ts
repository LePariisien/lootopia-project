import { Component, Input } from '@angular/core';
import { LucideAngularModule, Star } from 'lucide-angular';
import { TreasureHunt } from '../../../models/treasure-hunt.model';

@Component({
  selector: 'app-hunt-detail-opinion',
  imports: [LucideAngularModule],
  templateUrl: './hunt-detail-opinion.component.html',
  styleUrl: './hunt-detail-opinion.component.css'
})
export class HuntDetailOpinionComponent {
  readonly Star = Star;

  @Input() treasureHunt!: TreasureHunt;

}
