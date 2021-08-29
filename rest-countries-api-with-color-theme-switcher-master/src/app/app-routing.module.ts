import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
  { path: 'countries', 
  loadChildren: () => import('./modules/countries/countries.module').then(m => m.CountriesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
