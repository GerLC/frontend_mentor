import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountriesComponent } from './countries.component';
import { CountryDetailsComponent } from './pages/countryDetailsPage/country-details/country-details.component';
import { CountryListComponent } from './pages/countryGridPage/country-list/country-list.component';

const routes: Routes = [
  { path: '', component: CountriesComponent,
  children: [
    {
      path: '',
      component: CountryListComponent
    },
    {
      path: ':code',
      component: CountryDetailsComponent
    }
  ]},
  
  // { path: 'list', component: CountryListComponent },
  // { path: ':code', component: CountryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
