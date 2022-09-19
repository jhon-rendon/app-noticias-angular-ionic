import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHealines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key':apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  numberPage          = 0;
  numberPageCategoria = 0;
  categoriaActual     = '';

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>( query:string ){

    query = apiUrl + query;

    return this.http.get<T>( query, { headers} );
  }
  getHeadlines(){
     
    this.numberPage++;
    return this.ejecutarQuery<RespuestaTopHealines>( `/top-headlines?country=us&page=${ this.numberPage }`);
    //return this.http.get<RespuestaTopHealines>( `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=344d7f86ff8e4a3a90d440f085393f4c` );
  }

  getHeadLinesCategoria( categoria:string ){
    
    if( this.categoriaActual === categoria ){
      this.numberPageCategoria++;
    }else{
      this.categoriaActual = categoria;
      this.numberPageCategoria = 1;
    }

    console.log( `/top-headlines?country=us&category=${ categoria }&page=${ this.numberPageCategoria }`);
    
   // return this.http.get( `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=344d7f86ff8e4a3a90d440f085393f4c`);
   return this.ejecutarQuery<RespuestaTopHealines>( `/top-headlines?country=us&category=${ categoria }&page=${ this.numberPageCategoria }`);
  }
}
