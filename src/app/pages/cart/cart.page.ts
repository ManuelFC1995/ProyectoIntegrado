import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { cart } from 'src/app/model/cart';
import { Cliente } from 'src/app/model/Cliente';
import { Producto } from 'src/app/model/Producto';
import { ApiService } from 'src/app/Services/api.service';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: cart | null = {
    id_cliente: undefined,
    productos: undefined

  };

  public importe = 0;
  usuario: any;
  public Usuario: Cliente | null = {
    id: undefined,
    name: undefined,
    surname: undefined,
    email: undefined,
    pedidos: undefined,

  };
  public listadoConFoto: Array<Producto> = [];
  public listado: Array<Producto> = [];
  constructor(private route: ActivatedRoute, private apiS: ApiService,
    private navCtrl: NavController, private nativeS: NativeStorage,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingService, private router: Router) { }

  ngOnInit() {
    this.carga();
  }



  /**
* Metodo que carga los productos del carrito del native storage

* @param  cart  carrito de la compra
*/
  public async carga() {

    this.listadoConFoto = [];

    this.cart = await this.nativeS.getItem("cart");
    this.listado = this.cart.productos;
    this.listado.forEach((data) => {
      if (data.imagene1 == null) {
      } else {
        data.imagene1 = 'data:image/jpeg;base64,' + data.imagene1;
        console.log(data);
      }
      this.listadoConFoto.push(data);
    })
    this.listadoConFoto.forEach(element => {
      this.importe = this.importe + element.precio;
    });
    this.listadoConFoto.reverse();
  }


  //Refrescar la pagina
  doRefresh(event) {
    setTimeout(async () => {
      this.carga();
      event.target.complete();
    }, 500);
  }



  /**
* Metodo que Elimina el producto seleciconado del carrito

* @param  id id del elemento a borrar 
*/
  public async borrarElemento(id: any) {
    let productos: Producto[] = [];
    productos = this.cart.productos;
    productos.forEach(element => {
      if (element.id == id) {
        var index = productos.indexOf(element);
        if (index > -1) {
          productos.splice(index, 1);

        }
      }
    });
    this.cart = {
      id_cliente: this.Usuario.id,
      productos: productos
    }
    //guardar en el native storage
    await this.nativeS.setItem("cart", this.cart);
  }



  /**
* Metodo que muestra el alert para confirmar el borrado del producto del carrito

* @param  id id del elemento a borrar 
*/
  async presentAlertConfirmDelete(id: any) {

    const alert = await this.alertCtrl.create({
      header: "Atención!",
      message: "Seguro que desea Borrar El producto?",
      buttons: [
        {
          text: "cancelar",
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: "Borrar",
          handler: async () => {
            await this.loadingCtrl.presentLoading();
            this.borrarElemento(id);
            this.carga();
            this.loadingCtrl.loadingController.dismiss();
          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  //BackButton
  public atras() {
    this.navCtrl.back();
  }


//LLeva a la pagina de direccion
  GotoDireccion() {
    this.router.navigate(['/direccion'])
  }

}
