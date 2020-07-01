import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  // api: string = "https://jsonplaceholder.typicode.com/users";
  api: string = appConfig.apiURL + "/state-wise-list";

  constructor(private http: HttpClient) { 
    console.log('list');
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.api)
  }
}
