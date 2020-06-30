import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../core/api-service.service';
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  title = 'pwa-angular10';
  value:any;
  constructor(private ApiServiceService:ApiServiceService){
  }

  ngOnInit(){
    this.ApiServiceService.getUsers().subscribe((res) => {
     this.value=res;
    });
  }


}
