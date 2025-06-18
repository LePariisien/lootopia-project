import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CircleCheck, LucideAngularModule, XCircle } from 'lucide-angular';

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

  @Input() type: 'success' | 'error' = 'success';
  @Input() message: string = ''; 
  
  success: Boolean = this.type === 'success';
  error: Boolean = this.type === 'error';
}
