import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CountryService } from './services/countries/country.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpaInterceptor } from './interceptors/http.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: HttpaInterceptor, multi: true },
    CountryService,
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() core: CoreModule ){
    if (core) {
        throw new Error("You should import core module only in the root module")
    }
  }
}
