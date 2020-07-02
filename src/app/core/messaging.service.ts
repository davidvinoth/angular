import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { TokenServiceService } from './token-service.service'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor( private angularFireMessaging : AngularFireMessaging,
    private tokenService: TokenServiceService) { 
    
  }

  currentMessage = new BehaviorSubject(null);

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
    (token) => {
    console.log(token);
    this.tokenService.nextMessage(token);
    },
    (err) => {
    console.error('Unable to get permission to notify.', err);
    }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
    (payload) => {
    console.log("new message received. ", payload);
    this.currentMessage.next(payload);
    })
  }
}
