import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Artifact } from '../../../models/artifact.model';
import { Crown, LucideAngularModule, ShoppingCart, Star, Gem, Sparkles, LucideIconData, Zap, Check  } from 'lucide-angular';

@Component({
  selector: 'app-artifact-card',
  templateUrl: './artifact-card.component.html',
  styleUrls: ['./artifact-card.component.css'],
  imports: [CommonModule, LucideAngularModule]
})
export class ArtifactCardComponent {
  readonly ShoppingCart = ShoppingCart;
  readonly Crown = Crown;
  readonly Star = Star;
  readonly Gem = Gem;
  readonly Sparkles = Sparkles;
  readonly Zap = Zap;
  readonly Check = Check;

  @Input() artifact!: Artifact;
  @Output() buy = new EventEmitter<Artifact>();

  getRarityIcon(): LucideIconData {
    switch (this.artifact.rarity) {
      case 'Commun':
        return this.Star;
      case 'Rare':
        return this.Gem;
      case 'Épique':
        return this.Sparkles;
      case 'Légendaire':
        return this.Crown;
      default:
        return this.Star;
    }
  }
}
