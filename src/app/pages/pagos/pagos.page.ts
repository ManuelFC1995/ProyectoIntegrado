import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ActionSheetController, AlertController, Config, IonRouterOutlet, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { cart } from 'src/app/model/cart';
import { Cliente } from 'src/app/model/Cliente';
import { Direccion } from 'src/app/model/Direccion';
import { Pedido } from 'src/app/model/Pedido';
import { Producto } from 'src/app/model/Producto';
import { ApiService } from 'src/app/Services/api.service';

import { DireccionService } from 'src/app/Services/direccion.service';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {
  private category: string = null;
  public tasks: FormGroup;
  public form: FormGroup;
  public Productos: Producto[] = [];
  cart: cart | null = {
    id_cliente: undefined,
    productos: undefined

  };
  private valid: boolean;
  Direccion: Direccion = {
    Región: undefined,
    Provincia: undefined,
    CP: undefined,
    Calle: undefined,
    num: undefined,
    Puerta: undefined,
    telefono: undefined,
  }
  usuario: any;
  public Pedido: Pedido | null = {
    id: undefined,
    fecha_compra: undefined,
    importe: undefined,
    completado: undefined,
    nif: undefined,
    localidad: undefined,
    provincia: undefined,
    cp: undefined,
    calle: undefined,
    numero: undefined,
    puerta: undefined,
    phone: undefined,
    nombre_comprador: undefined,
    codigo_Comprador: undefined,
    email: undefined,
    productos: undefined,
    comprador: undefined,

  };
  public importe = 0;
  public Usuario: Cliente | null = {
    id: undefined,
    name: undefined,
    surname: undefined,
    email: undefined,
    pedidos: undefined,

  };
  currentdate: Date = new Date();
  imagenPaypal = "/assets/IMG/Paypal.gif";
  imagenTarjeta = "/assets/IMG/Tarjeta.gif";
  imagenBizum = "/assets/IMG/bizum.gif";
  imagenEnvio = "/assets/IMG/envio.gif";



  constructor(private aux: DireccionService, public alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
    public loadingCtrl: LoadingService,
    public LOadingCTR: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    private navCtrl: NavController,
    public config: Config,
    private modalController: ModalController,
    private apiS: ApiService,
    private formBuilder: FormBuilder,
    private nativeS: NativeStorage,
  ) {

    //Se inicializa el formulario
    this.form = this.formBuilder.group({

      tarjeta: [''],
      seguridad: ['']
    })

    //configura la fecha y hora actuales
    this.currentdate = new Date();
    var datetime = "Last Sync: " + this.currentdate.getDay() + "/" + this.currentdate.getMonth()
      + "/" + this.currentdate.getFullYear() + " @ "
      + this.currentdate.getHours() + ":"
      + this.currentdate.getMinutes() + ":" + this.currentdate.getSeconds();
  }

  async ngOnInit() {
    this.Direccion = this.aux.GetDireccion();
    this.cart = await this.nativeS.getItem("cart");
    this.Productos = this.cart.productos;
    this.Productos.forEach(element => {
      this.importe = this.importe + element.precio;
    });
    this.usuario = await this.nativeS.getItem("userApi");
    console.log(this.usuario);
    this.currentdate = new Date();
    var datetime = "Last Sync: " + this.currentdate.getDay() + "/" + this.currentdate.getMonth()
      + "/" + this.currentdate.getFullYear() + " @ "
      + this.currentdate.getHours() + ":"
      + this.currentdate.getMinutes() + ":" + this.currentdate.getSeconds();
    this.Usuario = await this.apiS.getUserId(this.usuario.id);
    console.log(this.Usuario);


    //Validacion del formulario
    this.form = this.formBuilder.group({

      tarjeta: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[A-Z])([A-Z0-9]+)$'),
        Validators.minLength(20),
        Validators.maxLength(20)
      ]),
      seguridad: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])([0-9]+)$'),
        Validators.minLength(3),
        Validators.maxLength(3)
      ])
    });
  }
  doRefresh(event) {
    setTimeout(async () => {
      this.carga();
      this.PedidoCR();
      event.target.complete();
    }, 500);
  }


  public async carga() {

  }

  //Elegir el metodo de pago
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Método de Pago',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Tarjéta de crédito/debito',
        role: 'destructive',
        icon: 'card',
        handler: () => {
          this.category = "Tarjeta";
        }
      }, {
        text: 'Paypal',
        icon: 'logo-paypal',
        handler: () => {
          this.category = "Paypal";
        }
      },
      {
        text: 'Contrareembolso',
        icon: 'rocket',
        handler: () => {
          this.category = "ContraRembolso";
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          this.category = null;
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  
  /**
* Metodo que realiza un pedido con tarjeta

* @param  Pedido  pedido que se realiza y se inserta en la bbdd
*/
  public async PedidoTarjeta() {

    this.Pedido = {

      fecha_compra: this.currentdate,
      nif: "",
      completado: false,
      localidad: this.Direccion.Región,
      provincia: this.Direccion.Provincia,
      cp: this.Direccion.CP,
      calle: this.Direccion.Calle,
      numero: this.Direccion.num,
      puerta: this.Direccion.Puerta,
      phone: this.Direccion.telefono,
      nombre_comprador: this.Usuario.name,
      codigo_Comprador: this.Usuario.id,
      email: this.Usuario.email,
      metedoPago: "Tarjeta de crédito",
      numero_cuenta: this.form.get('tarjeta').value,
      importe: this.importe,
      productos: this.Productos,
      comprador: this.Usuario
    };
    console.log(this.Pedido);
    this.apiS.createPedido(this.Pedido);
    this.Productos.forEach(async element => {
      let uds = element.Uds;
      uds--;
      element.Uds = uds;
      this.apiS.updateProducto(element);

    });
    this.cart = null;
    console.log(this.cart);
    await this.nativeS.setItem("cart", this.cart);
    this.router.navigate(['/folder/Inbox'])
  }




  /**
* Metodo que realiza un pedido a contrarrembolso

* @param  Pedido  pedido que se realiza y se inserta en la bbdd
*/
  public async PedidoCR() {
    this.loadingCtrl.presentLoading();
    this.Pedido = {

      fecha_compra: this.currentdate,
      nif: "",
      completado: false,
      localidad: this.Direccion.Región,
      provincia: this.Direccion.Provincia,
      cp: this.Direccion.CP,
      calle: this.Direccion.Calle,
      numero: this.Direccion.num,
      puerta: this.Direccion.Puerta,
      phone: this.Direccion.telefono,
      metedoPago: "Contrareembolso",
      importe: this.importe,

      productos: this.Productos,
      comprador: this.Usuario

    };
    console.log(this.Pedido);
    this.apiS.createPedido(this.Pedido);
    this.Productos.forEach(async element => {
      let uds = element.Uds;
      uds--;
      element.Uds = uds;
      this.apiS.updateProducto(element);

    });
    this.cart = null;
    console.log(this.cart);
    await this.nativeS.setItem("cart", this.cart);
    this.loadingCtrl.presentToastSinColor("Pedido Realizado");
    this.router.navigate(['/folder/Inbox'])
    this.loadingCtrl.loadingController.dismiss();

  }
  public atras() {
    this.navCtrl.back();
  }
}
