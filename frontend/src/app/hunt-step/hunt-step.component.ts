import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MapPin, Trash2 } from 'lucide-angular';
import { LocationSearchComponent } from '../components/location-search/location-search.component';

@Component({
  selector: 'app-hunt-step',
  standalone: true,
  templateUrl: './hunt-step.component.html',
  styleUrls: [],
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    LocationSearchComponent
  ]
})
export class HuntStepComponent {
  readonly MapPin = MapPin;
  readonly Trash2 = Trash2;

  @Input() step!: {
    id: number;
    title: string;
    clue: string;
    location: string;
    latitute: number;
    longitude: number;
    type: string;
    solution: string
  };
  @Input() stepNumber!: number;
  @Output() remove = new EventEmitter<number>();

  constructor() { }

  onRemove(): void {
    this.remove.emit(this.step.id);
  }

  onStepCoordinatesChange(coords: { lat: number, lng: number }, step: any) {
    step.latitute = coords.lat;
    step.longitude = coords.lng;
  }

}
