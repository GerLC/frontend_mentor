import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable()
export class CountryService {

  private readonly countryUrl = 'https://restcountries.eu/rest/v2';

  constructor(
    private httpClient: HttpClient,
  ) {}


  /**
   * Get all the countries.
   */
  getCountries(): Observable<any> {
    return this.httpClient.get<any[]>(this.countryUrl + '/all' + '/?fields=name;flag;population;region;capital;alpha3Code;').pipe(
      retry(2),
      tap(_ => this.log(`get all countries info`)),
      catchError(this.handleError<any>('getCountries'))
    );
  }


  /**
   * Search country by his code
   * @param code - Country code
   */
  searchByName(code: String): Observable<any> {
    return this.httpClient.get<any>(`${this.countryUrl}/alpha/${code}?fields=alpha3Code;name;nativeName;population;region;subregion;capital;topLevelDomain;currencies;languages;borders;flag;`).pipe(
      retry(2),
      tap(_ => this.log(`Get a country info by his full name`)),
      catchError(this.handleError<any>('searchByName'))
    );
  }


  /**
   * Search by country name.
   * It can be the native name or partial name.
   * @param name - Full or partial name of the country
   */
  filterCountriesByName(name: String): Observable<any> {
    return this.httpClient.get<any[]>(`${this.countryUrl}/name/${name}`).pipe(
      retry(2),
      tap(_ => this.log(`filter a country by name`)),
      catchError(this.handleError<any>('filterCountriesByName'))
    );
  }


  /**
   * Search by region: Africa, Americas, Asia, Europe, Oceania
   * @param region - Existing regions 
   */
  searchByRegion(region: String): Observable<any> {
    return this.httpClient.get<any[]>(`${this.countryUrl}/region/${region}?fields=alpha3Code;name;flag;population;region;capital;`).pipe(
      retry(2),
      tap(_ => this.log(`filter a countries by region`)),
      catchError(this.handleError<any>('searchByRegion'))
    );
  }




  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`EstudioService: ${message}`);
  }

}

