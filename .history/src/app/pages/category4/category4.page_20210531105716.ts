import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController, Config, IonRouterOutlet, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { cart } from 'src/app/model/cart';
import { Producto } from 'src/app/model/Producto';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-category4',
  templateUrl: './category4.page.html',
  styleUrls: ['./category4.page.scss'],
})
export class Category4Page implements OnInit {
  segmentModel ="list";
  orden;
  public listado: Array<Producto> ;
  public listadoConFoto: Array<Producto> = [] ;
  private category:string=null;
  public tasks:FormGroup;
  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;
  textoBuscar='';
  p:Producto[];
  nProductosCart=0;
  cart: cart| null = {
    id_cliente: undefined,
    productos:undefined
    
  };
  public tasksfiltro: FormGroup;
  public isAuth:boolean=false;
  ProductosCarrito:Producto[];
  constructor( public alertCtrl: AlertController,
    public loadingCtrl: LoadingService,
    public LOadingCTR: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public config: Config,
    private modalController:ModalController,
    private apiS:ApiService,
    private formBuilder:FormBuilder,
    private auth:AuthService,
    private nativeS:NativeStorage) { }

  async ngOnInit() {
    this.tasksfiltro = this.formBuilder.group({


      orden: [''],
      
       
 
     })
      this.isAuth=this.auth.isAuthenticated();
    this.carga();
  }
  doRefresh(event) {
    setTimeout(async () => {
   this.carga();
      event.target.complete();
    }, 500);
  }
  public async carga(){
    this.orden=  this.tasksfiltro.get('orden').value;
    this.listadoConFoto= [] ;
    
    
      this.listado=await this.apiS.getProductall();
      console.log(this.p);
      this.listado.forEach((data)=>{
        if(data.categoria=="Sónido"){
          if(data.imagene1==null){
           
       
          }else{
           data.imagene1='data:image/jpeg;base64,'+data.imagene1;
           console.log(data);
          
          }
          if(data.imagene2==null){
           
          
          }else{
           data.imagene2='data:image/jpeg;base64,'+data.imagene2;
           console.log(data);
          
          }
          if(data.imagene3==null){
          
         
          }else{
           data.imagene3='data:image/jpeg;base64,'+data.imagene3;
           console.log(data);
        
          }
          this.listadoConFoto.push(data);
        }
      }) 
      if(this.orden==''){
        this.listadoConFoto.reverse();
      }
  if(this.orden=='new'){
    this.listadoConFoto.reverse();
  }
  if(this.orden=='old'){
  
  }
  if(this.orden=='price1'){
    this.listadoConFoto.sort(this.comparePrice1);
  }
  if(this.orden=='price2'){
    this.listadoConFoto.sort(this.comparePrice2);
  }
  if(this.orden=='top'){
    this.listadoConFoto.reverse(); //aun no funciona
  }
    if(this.auth.isAuthenticated()){
     
      this.cart=await this.nativeS.getItem("cart");
      this.ProductosCarrito=this.cart.productos;
    
      this.nProductosCart=this.cart.productos.length;
    }else{
      console.log("no hay usuario");
      this.nProductosCart=0;
    }
  
  }

  ionViewDidEnter(){

    
  }
  segmentChanged(ev?: any){
    ev = ev?ev:{detail: {value: 'orden'}};
    if(ev.detail.value == 'list' ){
   this.orden="list";
    }else if(ev.detail.value == 'block' ){
      this.orden="block";
    }
  }

  comparePrice1(a:Producto, b:Producto) {
    if (a.precio>=b.precio) {
      return -1;
    }
    if (a.precio<=b.precio) {
      return 1;
    }
    // a debe ser igual b
    return 0;
  }

  comparePrice2(a:Producto, b:Producto) {
    if (a.precio<=b.precio) {
      return -1;
    }
    if (a.precio>=b.precio) {
      return 1;
    }
    // a debe ser igual b
    return 0;
  }

  ToastCarrito(){
    this.loadingCtrl.presentToastSinColor("Para utilizar las funciones de compra inicie sesion en la pestaña 'Perfil'")
  }
}
