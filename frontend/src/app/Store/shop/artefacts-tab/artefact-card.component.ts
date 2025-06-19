import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Artefact } from '../../../models/artefact.model';
import { Crown, LucideAngularModule, ShoppingCart, Star, Gem, Sparkles, LucideIconData, Zap, Check  } from 'lucide-angular';

@Component({
  selector: 'app-artefact-card',
  templateUrl: './artefact-card.component.html',
  styleUrls: ['./artefact-card.component.css'],
  imports: [CommonModule, LucideAngularModule]
})
export class ArtefactCardComponent {
  readonly ShoppingCart = ShoppingCart;
  readonly Crown = Crown;
  readonly Star = Star;
  readonly Gem = Gem;
  readonly Sparkles = Sparkles;
  readonly Zap = Zap;
  readonly Check = Check;

  @Input() artefact!: Artefact;
  @Output() buy = new EventEmitter<Artefact>();

  getRarityIcon(): LucideIconData {
    switch (this.artefact.rarity) {
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
