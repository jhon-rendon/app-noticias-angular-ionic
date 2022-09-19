import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias:Article[] = [];

  constructor( private serviceNoticias: NoticiasService) {}

  ngOnInit(){
    this.cargarNoticia();
  }

  loadData( event ){
    console.log(event);
    this.cargarNoticia( event );
  }

  cargarNoticia( event? ){
    this.serviceNoticias.getHeadlines()
      .subscribe( data => {
         console.log(data);
         if( data.articles.length === 0){
          event.target.disabled = true;
          event.target.complete();
          return;
         }
        
          this.noticias.push(... data.articles );
        
         if( event ){
            event.target.complete();
         }

         
      });
  }
}
