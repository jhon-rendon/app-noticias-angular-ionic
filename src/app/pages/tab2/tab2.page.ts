import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonSegmentButton } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article, RespuestaTopHealines } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  //@ViewChild(IonSegment) segment: IonSegment;
  segment:string = '';

  categorias = [ 'business', 'entertainment','general','health','science','sports','technology'];
  noticiasCategoria:Article[] = [];

  constructor( private serviceNoticias: NoticiasService) {
  
  }

  ngOnInit() {
    this.segment   = this.categorias[0];
    this.cargarNoticia( this.segment );
  }

  cargarNoticia( categoria:string, event? ){
    
    
    this.serviceNoticias.getHeadLinesCategoria( categoria )
    .subscribe( noticia => {
       console.log(noticia);
       if( noticia.articles.length === 0  ){
           event.target.disabled = true;
           event.target.complete();
    
         return;
       }
       this.noticiasCategoria.push( ...noticia.articles );

       if( event ){
        event.target.complete();  
       }
    });

    console.log( this.serviceNoticias.numberPageCategoria);
     
  }

  segmentChanged( event ){
    this.noticiasCategoria = [];
    this.cargarNoticia( event.detail.value );
  }

  loadData( event ){
    console.log(this.segment);
    this.cargarNoticia( this.segment , event);
  } 



}
