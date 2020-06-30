import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  private tokenString = new BehaviorSubject('');
  token = this.tokenString.asObservable();

  constructor() { }

  nextMessage(token: string) {
    this.tokenString.next(token);
  }
}
