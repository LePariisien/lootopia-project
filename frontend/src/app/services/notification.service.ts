import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../api-routes';
import { Observable, Subject } from 'rxjs';

export interface Notification {
  id?: string;
  message: string;
  date: Date;
  read: boolean;
  playerId: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationCreatedSource = new Subject<void>();
  notificationCreated$ = this.notificationCreatedSource.asObservable();

  constructor(private http: HttpClient) {}

  createNotification(notification: Partial<Notification>): Observable<Notification> {
    return new Observable(observer => {
      this.http.post<Notification>(ApiRoutes.createNotification(), notification).subscribe({
        next: (notif) => {
          this.notificationCreatedSource.next();
          observer.next(notif);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  getNotificationsByPlayerId(playerId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(ApiRoutes.GetNotificationsByPlayerId(playerId));
  }
}