import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersListRoutingModule } from './customers-list-routing.module';
import { CustomersListComponent } from './customers-list.component';


@NgModule({
  declarations: [CustomersListComponent],
  imports: [
    CommonModule,
    CustomersListRoutingModule
  ]
})
export class CustomersListModule { }
