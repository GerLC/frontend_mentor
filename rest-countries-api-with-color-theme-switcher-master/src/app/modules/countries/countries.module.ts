import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRoutingModule } from './countries-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CountriesComponent } from './countries.component';
import { CountryDetailsComponent } from './pages/countryDetailsPage/country-details/country-details.component';
import { CountryListComponent } from './pages/countryGridPage/country-list/country-list.component';
import { CountryCardComponent } from './components/Card/country-card/country-card.component';
import { DropdownComponent } from './components/Dropdown/dropdown/dropdown.component';
import { SearchFormComponent } from './components/SearchForm/search-form/search-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CountriesComponent,
    CountryDetailsComponent,
    CountryListComponent,
    CountryCardComponent,
    DropdownComponent,
    SearchFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CountriesRoutingModule,
    SharedModule,
  ]
})
export class CountriesModule { }
