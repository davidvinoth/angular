import { Component } from '@angular/core';
import { SwUpdate, SwPush  } from '@angular/service-worker';
import { TokenServiceService } from '../app/core/token-service.service';
import * as firebase from 'firebase/app';
import 'firebase/messaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Add Customer';
  errorMsg = '';
  displayToken: string;

  update: boolean = false;

  constructor(updates: SwUpdate, push: SwPush,private tokenService: TokenServiceService ) {
    updates.available.subscribe(event => {
      if(confirm('New version available  ! would you like to update')){
        window.location.reload();
      }
    });

    push.messages.subscribe(msg => console.log('push message', msg));
    push.notificationClicks.subscribe(click => console.log('notification click', click));
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBEifQmmLrR55X3zfzmRqxVv-QRr7-1CRA",
        authDomain: "angular-pwa-399eb.firebaseapp.com",
        databaseURL: "https://angular-pwa-399eb.firebaseio.com",
        projectId: "angular-pwa-399eb",
        storageBucket: "angular-pwa-399eb.appspot.com",
        messagingSenderId: "981777406933",
        appId: "1:981777406933:web:5a7356b3f76733476afb5c"
      });

      navigator.serviceWorker.ready
      .then((registration) => firebase.messaging().useServiceWorker(registration));
      // navigator.serviceWorker.getRegistrations().then(function(registrations) { for(let registration of registrations) { registration.unregister() } })
    }
  }

  ngOnInit(){
    this.tokenService.token.subscribe(token => this.displayToken = token);
    this.permitToNotify();
  }


  updateToken(token){
    this.displayToken = token
    this.tokenService.nextMessage(token);
  }

  permitToNotify() {
    const messaging = firebase.messaging();
    console.log(messaging,"messaging")
    messaging.requestPermission()
      .then(() => messaging.getToken().then(token => this.updateToken(token)))
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });
  }
}
