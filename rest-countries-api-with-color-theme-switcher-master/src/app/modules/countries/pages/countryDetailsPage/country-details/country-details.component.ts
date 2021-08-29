import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/modules/core/services/countries/country.service';
import { switchMap } from 'rxjs/operators';
import { expand, flyInOut } from '../../../../shared/animations/route-transition-animations';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand(),
  ]
})
export class CountryDetailsComponent implements OnInit {

  textBtnConfig = {
    styles: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '150px',
      height: '60px',
      padding: '.5em',
      fontSize: '20px',
      borderRadius: '5px',
    },
    back: 'Back'
  };

  borderBtnConfig = {
    styles: {
      position: 'relative',
      padding: '0 .5em',
      borderRadius: '5px',
    },
  };

  countryCode: string = '';
  country: any;

  constructor(private countryService: CountryService,
              private route: ActivatedRoute,
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.countryCode = params['code'];
    });  

    this.getCountry();

    this.route.params.pipe(
      switchMap((params) => {
        return this.countryService.searchByName(params['code'])
      }))
      .subscribe(x => { 
        this.country = x; 
      });
  }


  getCountry() {
    this.countryService.searchByName(this.countryCode).subscribe((x) => {
      this.country = x;
      console.log(this.country)
    });
  }

  onClickEventReceived(event: any) {
    console.log(event);
  }

  navigate(border: any) {
    this.router.navigate(['/countries/' ,border]);
  }

}
