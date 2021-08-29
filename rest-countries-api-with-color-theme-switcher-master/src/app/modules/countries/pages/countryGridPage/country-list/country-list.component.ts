import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/modules/core/services/countries/country.service';
import { FilterPipe } from 'src/app/modules/shared/pipes/filter.pipe';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  stagger,
  query,
  sequence,
} from '@angular/animations';
import { expand, flyInOut } from '../../../../shared/animations/route-transition-animations';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand(),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ],

})
export class CountryListComponent implements OnInit {

  countries: any[] = [];
  region: string = '';
  search: string = ''; 

  constructor(
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.getAllCountries();
  }

  getAllCountries(filter?: any) {
    this.countryService.getCountries().subscribe((data) => {
      if (!filter) {
        this.countries = data;
      }
      
      if (filter) {

        this.countries = data.filter((x:any) => {
          if(
            x.name.toLowerCase().indexOf(this.search) > -1   &&
            x.region == this.region
            )
          return x
        })

      }
    });
  }

  getCountryByName(name: string) {
    this.countryService.filterCountriesByName(name).subscribe(data => {
      this.countries = data;
    })
  }

  getCountryByRegion(name: string) {
    this.countryService.searchByRegion(name).subscribe(data => {
      this.countries = data;
    })
  }


  getData() {
    
    if(this.search && this.region) {
      console.log('both')
      this.getAllCountries(true);

    }

    if(!this.search && this.region) {
      console.log('region')
      this.getCountryByRegion(this.region);
    }

    if(this.search && !this.region) {
      console.log('search')
      this.getCountryByName(this.search);
    }

    if(!this.search && !this.region) {
      console.log('both nothing');
      this.getAllCountries();
    }
  }

  // Filter
  searchFilter(event: string) {
    this.search = event;
    this.getData();
  }

  dropdownFilter(event: string) {
    this.region = event;
    this.getData();
  }
  
}
