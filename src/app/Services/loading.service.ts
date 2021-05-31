import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

 
  constructor(   public loadingController: LoadingController,
    public toastController: ToastController) { }
  
  

                      /**
* Metodo que muestra el loading

*/
    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
      
       // message: '<img src="/assets/img/loading.svg">',
        spinner:"crescent",
       // spinner:null,
        //leaveAnimation:null,
      });
      await loading.present();
    }



                          /**
* Metodo que muestra el toast

*/
    async presentToast(msg:string,col:string) {
      const toast = await this.toastController.create({
        message: msg,
        color:col,
        duration: 2000,
        position:"middle"
      });
      toast.present();
    }


                          /**
* Metodo que muestra el toast

*/
    async presentToastSinColor(msg:string) {
      const toast = await this.toastController.create({
        message: msg,
        
        duration: 2000,
        cssClass: "yourclass",
        position:"middle"
      });
      toast.present();
    }

    Dismiss(){
      this.loadingController.dismiss();
    }
}
