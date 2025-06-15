import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { LucideAngularModule, Clock, ChevronLeft } from 'lucide-angular';
import { TreasureHunt } from '../../../models/treasure-hunt.model';
import { Treasure } from '../../../models/treasure.model';
import { Clue } from '../../../models/clue.model';
import { Participation } from '../../../models/participation.model';

@Component({
  selector: 'app-hunt-header',
  templateUrl: './hunt-header.component.html',
  styleUrl: './hunt-header.component.css',
  imports: [
    LucideAngularModule
  ]
})
export class HuntHeaderComponent {
  readonly Clock = Clock;
  readonly ChevronLeft = ChevronLeft;

  @Input() treasureHunt!: TreasureHunt;
  @Input() treasure!: Treasure;
  @Input() clues!: Clue[];
  @Input() participation!: Participation;

  @Output() notesSaved = new EventEmitter<void>();

  time: string = '';
  timer: any;
  isPaused = false;
  elapsedMs = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.treasureHunt?.startDate && !this.participation?.isWinner) {
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  get title(): string {
    return this.treasureHunt?.name ?? '';
  }

  get status(): string {
    return this.participation?.status ?? '';
  }

  get isWinner(): boolean {
    return this.participation?.isWinner ?? false;
  }

  get currentStep(): number {
    if (this.participation?.current_step < 0) {
      return 0;
    }
    if (this.participation?.current_step > this.clues?.length) {
      return this.clues?.length ?? 0;
    }

    return this.participation?.current_step ?? 0;
  }

  get totalSteps(): number {
    return this.clues?.length ?? 0;
  }

  get progress(): number {
    var progressInPercent = this.totalSteps > 0 ? Math.round((this.currentStep / this.totalSteps) * 100) : 0;

    return progressInPercent > 100 ? 100 : progressInPercent;
  }

  startTimer(): void {
    if (!this.participation?.startDate || this.participation.isWinner) return;

    const now = new Date();
    const start = new Date(this.participation.startDate);

    if (this.participation.endDate) {
      this.elapsedMs = new Date(this.participation.endDate).getTime() - start.getTime();
    } else {
      this.elapsedMs = now.getTime() - start.getTime();
    }

    this.isPaused = false;
    this.timer = setInterval(() => this.updateTimer(), 1000);
    this.updateTimer();
  }


  private updateTimer(): void {
    if (this.participation.isWinner === true) {
      clearInterval(this.timer);
      this.timer = null;
      this.isPaused = true;
    }

    const now = new Date();
    const start = new Date(this.participation.startDate);

    const currentElapsed = now.getTime() - start.getTime();
    const totalElapsed = this.isPaused ? this.elapsedMs : currentElapsed;

    const hours = Math.floor(totalElapsed / (1000 * 60 * 60));
    const minutes = Math.floor((totalElapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalElapsed % (1000 * 60)) / 1000);

    this.time =
      `${hours.toString().padStart(2, '0')}:` +
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}`;

    this.cdr.detectChanges();
  }


  pauseTimer(): void {
    if (this.timer && !this.isPaused) {
      clearInterval(this.timer);
      this.timer = null;
      this.isPaused = true;

      const now = new Date();
      const start = new Date(this.participation.startDate);
      this.elapsedMs = now.getTime() - start.getTime();

      this.participation.endDate = new Date(start.getTime() + this.elapsedMs).toString();
    }
  }


  resumeTimer(): void {
    if (!this.timer && this.isPaused) {
      this.isPaused = false;
      this.participation.endDate = "";

      this.timer = setInterval(() => this.updateTimer(), 1000);
      this.updateTimer();
    }
  }


  saveNotes() {
    this.notesSaved.emit();
  }

}
