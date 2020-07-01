import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import Dexie from 'dexie';
import { catchError, mergeMap, concatMap } from 'rxjs/operators';
import { throwError, forkJoin, Observable, of } from 'rxjs';
import { OnlineofflineService } from './onlineoffline.service';
import { appConfig } from '../../../config';



@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private db: any;
  //_url = 'http://localhost:3000/enroll';
  _url = appConfig.apiURL + '/enroll';
  constructor(private _http: HttpClient, private onlineOfflineService: OnlineofflineService) {
    this.createDatabase();
    this.registerToEvents();
  }

  private registerToEvents() {
    this.onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        console.log('went online');
        console.log('sending all stored items');
        this.sendItemsFromIndexedDb();
      } else {
        console.log('went offline, storing in indexdb');
      }
    });
  }

  private createDatabase() {
    this.db = new Dexie('pwa');
    this.db.version(1).stores({
      symptom_checker: 'physicalCondition,age,gender,closeContact,symptoms,token'
    });
  }

  private addToIndexedDb(user: any) {
    this.db.symptom_checker
      .add(user)
      .then(async () => {
        const allItems: any[] = await this.db.symptom_checker.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e));
      });
  }

  private async sendItemsFromIndexedDb() {
    console.log("sendItemsFromIndexedDb");
    const allItems: any[] = await this.db.symptom_checker.toArray();
    console.log(allItems);

    of(allItems).pipe(mergeMap((allItems) => {
      console.log("of");
      console.log(allItems,"allitem");
      return forkJoin(...allItems.map(item =>{
        console.log(item,"item")
        return this._http.post<any>(this._url, item).pipe(catchError(this.errorHandler))
      }
        ))
    }
    )).subscribe(res=>console.log(res));
  }

  enroll(user: any) {
    if (!this.onlineOfflineService.isOnline) {
      console.log("Offline");
      this.addToIndexedDb(user);
    } else {
      console.log("Online");
      return this._http.post<any>(this._url, user)
        .pipe(catchError(this.errorHandler))
    }
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  }
}
