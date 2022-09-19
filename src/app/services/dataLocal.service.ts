import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  private _storage: Storage | null = null;
  noticias: Article[] = [];

  constructor( private storage: Storage, 
               private toastController: ToastController ) { 
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }


  guardarNoticia( noticia:Article ){

    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if( !existe ){
      this.noticias.unshift( noticia );
      this._storage?.set('favoritos', this.noticias );
    }
    this.presentToast('Noticia guardada en favoritos');
  }

  async cargarFavoritos(){

    const favoritos = await this.storage.get('favoritos');

    this.noticias = favoritos;

  }

  borrarNoticia( noticia:Article ){

    this.noticias = this.noticias.filter( noti => noticia.title !== noti.title );
    console.log('borrar noticia');
    this.presentToast('Noticia Eliminada de favoritos');

  }

  async presentToast( message:string ='') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'middle'
    });

    await toast.present();
  }

}
