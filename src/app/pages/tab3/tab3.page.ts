import { Component, OnInit } from '@angular/core';
import { DatalocalService } from '../../services/dataLocal.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  opc = {
    allowSlidePrev : false,
    allowSlideNext : false

  }
  constructor( public dataLocal: DatalocalService) {

   

  }

  ngOnInit(): void {
    this.dataLocal.cargarFavoritos();

    console.log(this.dataLocal.noticias.length);
  }

}
