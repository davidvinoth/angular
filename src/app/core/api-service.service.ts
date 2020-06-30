import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  // api: string = "https://jsonplaceholder.typicode.com/users";
  api: string = "http://localhost:3000/state-wise-list";

  constructor(private http: HttpClient) { 
    console.log('list');
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.api)
  }
}
