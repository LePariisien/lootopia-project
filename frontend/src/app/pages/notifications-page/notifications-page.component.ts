import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NotificationsPageComponent implements OnInit {
  notifications: Notification[] = [];
  sortDesc = true;

  constructor(private notificationService: NotificationService, private authService: AuthService) {}

  ngOnInit() {
    const playerId = this.authService.getPlayerId();
    if (playerId) {
      this.notificationService.getNotificationsByPlayerId(playerId).subscribe({
        next: (notifs) => {
          this.notifications = notifs;
          this.sortByDate();
        }
      });
    }
  }

  sortByDate() {
    this.notifications.sort((a, b) =>
      this.sortDesc
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  toggleSort() {
    this.sortDesc = !this.sortDesc;
    this.sortByDate();
  }

  markAsRead(notif: Notification) {
    if (notif.read) return;
    this.notificationService.markAsRead(notif.id!).subscribe({
      next: () => {
        notif.read = true;
        this.notifications = [...this.notifications];
        this.notificationService.notificationCreatedSource.next();
      }
    });
  }


}
