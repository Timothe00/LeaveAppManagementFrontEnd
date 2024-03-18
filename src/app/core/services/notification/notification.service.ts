import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<number>();

  public notification$ = this.notificationSubject.asObservable();

  updateNotificationCount(count: number) {
    this.notificationSubject.next(count);
  }
  constructor() { }
}
