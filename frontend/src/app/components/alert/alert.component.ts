import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CircleCheck, Info, LucideAngularModule, TriangleAlert, XCircle } from 'lucide-angular';

@Component({
  selector: 'app-alert',
  imports: [
    LucideAngularModule,
    CommonModule
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  readonly CircleCheck = CircleCheck;
  readonly XCircle = XCircle;
  readonly Info = Info;
  readonly TriangleAlert = TriangleAlert;

  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'success';
  @Input() message: string = '';

  get success() { return this.type === 'success'; }
  get error() { return this.type === 'error'; }
  get info() { return this.type === 'info'; }
  get warning() { return this.type === 'warning'; }
}
