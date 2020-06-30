import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Dexie from 'dexie';
import { Todo } from '../models/todo';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class OnlineofflineService {

  private internalConnectionChanged = new Subject<boolean>();

  get connectionChanged() {
    return this.internalConnectionChanged.asObservable();
  }

  get isOnline() {
    return !!window.navigator.onLine;
  }

  constructor() {
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  private updateOnlineStatus() {
    console.log('updateOnlineStatus', this.internalConnectionChanged.next(window.navigator.onLine));
    this.internalConnectionChanged.next(window.navigator.onLine);
  }
}
