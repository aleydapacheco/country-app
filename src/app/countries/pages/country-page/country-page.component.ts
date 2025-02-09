import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  //Inyeccion de Servicios
  constructor( 
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id )),
      )
      .subscribe( country => {
        if( !country ) return this.router.navigateByUrl('');
        //console.log('TENEMOS UN PAIS');
        return this.country = country;
        //return;
      });
  }
}



