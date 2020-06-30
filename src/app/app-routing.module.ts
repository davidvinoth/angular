import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/customers-list', pathMatch: 'full' },
  { path: 'symptom-checker', loadChildren: () => import('./modules/customers/customers.module').then(m => m.CustomersModule) },
  { path: 'customers-list', loadChildren: () => import('./modules/customers-list/customers-list.module').then(m => m.CustomersListModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
