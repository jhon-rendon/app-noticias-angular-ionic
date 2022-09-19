import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { DatalocalService } from '../../services/dataLocal.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Article;
  @Input() numero:Number;
  @Input() enFavorito;

  constructor( private iab: InAppBrowser,
               private actionSheetCtrl: ActionSheetController,
               private social: SocialSharing,
               private dataService: DatalocalService) { }

  ngOnInit() {

    console.log('enFavorito:',this.enFavorito);
  }

  verNoticiaCompleta( url:string ){

    console.log ( this.noticia.url );
    const browser = this.iab.create( url, '_system');
  }


  async lanzarMenu(){

    let btnGuardarBorarr;
    
    if( this.enFavorito ){
      btnGuardarBorarr = {
        text: 'Borrar Favorito',
        icon: 'trash',
        data: 'Data value',
        cssClass:'action-dark',
        handler: () => {
          console.log('Borrar Favorito');
          this.dataService.borrarNoticia( this.noticia );
          
        }
      }
    }else{
      btnGuardarBorarr = {
        text: 'Favorito',
        icon: 'star',
        data: 'Data value',
        cssClass:'action-dark',
        handler: () => {
          console.log('Favorito');
          this.dataService.guardarNoticia( this.noticia );
          //console.log( this.noticia );
        }
      }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      //cssClass: 'action-dark',
      buttons: [
        {
        text: 'Compartir',
        icon: 'share',
        cssClass:'action-dark',
        handler: () => {
          console.log('Favorito');
          this.social.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url

          );
        }
      }, 
      btnGuardarBorarr,
       {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass:'action-dark',
        handler: () => {
          console.log('Cancelar');
        }
      }
      ]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    //console.log('onDidDismiss resolved with role and data', role, data);
  }

  

}
