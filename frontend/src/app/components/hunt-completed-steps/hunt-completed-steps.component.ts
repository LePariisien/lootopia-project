import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Clue } from '../../models/clue.model';
import { Participation } from '../../models/participation.model';
import { LucideAngularModule, CheckCircle } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hunt-completed-steps',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hunt-completed-steps.component.html',
  styleUrl: './hunt-completed-steps.component.css'
})
export class HuntCompletedStepsComponent {
  readonly CheckCircle = CheckCircle;

  @Input() step!: number;
  @Input() clues!: Clue[];
  @Input() participation!: Participation;

  @Output() stepChange = new EventEmitter<number>();

  hasNoCompletedClues(): boolean {
    if (!this.clues || !this.participation) return true;
    return this.clues.filter(c => c.step <= this.participation.current_step).length === 0;
  }

  reviewClue(clue: Clue): void {
    this.stepChange.emit(clue.step - 1);
  }

}
