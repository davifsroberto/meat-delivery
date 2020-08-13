import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class NotificationService {
  notifier = new EventEmitter<any>();

  notify(message: string) {
    this.notifier.emit(message);
  }
}
