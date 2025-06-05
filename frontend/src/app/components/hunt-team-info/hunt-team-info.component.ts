import { Component, Input } from '@angular/core';
import { LucideAngularModule, Users } from 'lucide-angular';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-hunt-team-info',
  imports: [LucideAngularModule],
  templateUrl: './hunt-team-info.component.html',
  styleUrl: './hunt-team-info.component.css'
})
export class HuntTeamInfoComponent {
  readonly Users = Users;

  @Input() player!: Player;

}
