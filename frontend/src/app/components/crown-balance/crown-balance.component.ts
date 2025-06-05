import { Component, Input } from '@angular/core';
import { LucideAngularModule, Crown } from 'lucide-angular';
@Component({
  selector: 'app-crown-balance',
  standalone: true,
  templateUrl: './crown-balance.component.html',
  styleUrls: ['./crown-balance.component.css'],
  imports: [LucideAngularModule],
})
export class CrownBalanceComponent {
  readonly Crown = Crown;
  @Input() crownCount: number = 0;
}
