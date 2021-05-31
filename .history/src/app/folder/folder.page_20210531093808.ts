import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommerceService } from '../Services/commerce.service';
import Commerce from '@chec/commerce.js'
import { AnimationOptions } from 'ngx-lottie';
import { Producto } from '../model/Producto';
import { ApiService } from '../Services/api.service';
import { AuthService } from '../Services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../model/Cliente';
import { NavController } from '@ionic/angular';
import { cart } from '../model/cart';
import { LoadingService } from '../Services/loading.service';
import { Pedido } from '../model/Pedido';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string='Inbox';
  public foldername: string;  
  private inL;
  login: FormGroup;
  userdata: any;
  user:Cliente;
  GooglePlay:string="assets/IMG/Playstore.png"
  FacebookLogo:string="assets/IMG/logo-facebook.png"
  GoogleLogo="assets/IMG/google-logo.png"
 mensaje = false;
public productos:Producto[];
category1:string="assets/Lottie/carcasas.gif";
homecategory1:string="assets/IMG/accesorios_para_moviles.jpg";
category3:string="assets/Lottie/smart.gif";
homecategory3:string="assets/IMG/coji.jpg";
category2:string="assets/Lottie/screen.gif";
homecategory2:string="assets/IMG/deco.jpg";
category4:string="assets/Lottie/sound.gif";
category5:string="assets/Lottie/gamer.gif";
homecategory4:string="assets/IMG/ext.jpg";
imagenshop= "/assets/IMG/animation_shop.gif";
imagenmv= "/assets/IMG/animation_mv.gif";
options:AnimationOptions ={
path:'assets/Lottie/contact-us.json'

}

imagenPaypal = "/assets/IMG/Paypal.gif";
imagenTarjeta = "/assets/IMG/Tarjeta.gif";
imagenLogo = "/assets/IMG/Logo.png";
public tasksfiltro: FormGroup;
imagenEnvio = "/assets/IMG/envio.gif";
 public isAuth:boolean=false;
 pedidos:Pedido[]=[];
usuario:any;

public listado: Array<Producto> ;
public Smart: Producto[]=[] ;
public listadoConFoto: Array<Producto> = [] ;
public listadoConFotoSmart: Array<Producto> = [] ;
public Usuario:Cliente  | null= {
  id : undefined,
  name:undefined,
  surname: undefined,
  email: undefined,
  pedidos: undefined,
  
};
cart: cart| null = {
  id_cliente: undefined,
  productos:undefined
  
};

ProductosCarrito:Producto[];
nProductosCart=0;
  constructor(private fb: FormBuilder,private navCtrl: NavController,private activatedRoute: ActivatedRoute,
    private commerce:CommerceService,private apiS:ApiService,private load:LoadingService,
    private autS:AuthService,private nativeS:NativeStorage,private router :Router) { }

  async ngOnInit() {


 this.init();
                                  //Otras cosas
                         
                            
  }

  

  //no entra aqui
 

GotoCategory1(){
  this.router.navigate(['/category1'])
}
GotoCategory2(){
  this.router.navigate(['/category2'])
}
GotoCategory3(){
  this.router.navigate(['/category3'])
}
GotoCategory4(){
  this.router.navigate(['/category4'])
}

public GotoCategory5(){
  this.router.navigate(['/category5'])
}
GotoCategory6(){
  this.router.navigate(['/category6'])
}

GotoLogin(){
  this.router.navigate(['/login'])
}

doRefresh(event) {
  setTimeout(async () => {

    this.init();

    event.target.complete();
  }, 500);
}

Logaut(){
  this.autS.logout();
  this.isAuth=false;
}


  async onLogin() {
  if (this.login.valid) {
    console.log(this.login.value);
    this.isAuth=true;
  }
}

public async loginGoogle(){
  let u=await this.autS.loginGoogle();
  if(u){
   console.log(u);
   this.isAuth=true;
  }else{
    console.log("no hay ");
    this.isAuth=false;
  }
}
onSubmit() {
  this.userdata = this.saveUserdata();
  this.autS.inicioSesion(this.userdata);

 
  }

  

  saveUserdata() {
    const saveUserdata = {
    email: this.login.get('email').value,
    password: this.login.get('password').value,
    };
    return saveUserdata;
    }

    async init(){

      this.isAuth= await this.autS.isAuthenticated();
      if(this.autS.isAuthenticated()){
        console.log("entra a esta autenticado");
        console.log(this.autS.isAuthenticated());
        this.usuario = await this.nativeS.getItem("userApi");
        try{
          this.Usuario=await  this.apiS.getUserId(this.usuario.id);
        }catch(err){
  console.log(err);
        }
       
        this.cart=await this.nativeS.getItem("cart");
        try{
          this.ProductosCarrito=this.cart.productos;
        }catch(err){
          console.log(err);
        }
  
      
        console.log(this.Usuario);
        try{
          this.nProductosCart=this.cart.productos.length;
        }catch(err){
          console.log(err);
                }
       
   
     
  
      }else{
        console.log("no hay usuario");
        this.nProductosCart=0;
      }
  
  
     
  console.log(this.isAuth);
      //Configuracion de los folders
      this.folder = this.activatedRoute.snapshot.paramMap.get('id');
      if(this.folder=='Inbox'){
      
    
        this.Smart=await this.apiS.getProductall();
        this.Smart.forEach((data)=>{
          console.log(data);
      if(data.categoria=="Smartwatch"){
        if(data.imagene1==null){
              
        }else{
         data.imagene1='data:image/jpeg;base64,'+data.imagene1;
        
        }
    
        this.listadoConFotoSmart.push(data);
        console.log(data);
      } 
        }) 
    
  this.foldername="HOME"
      }
      if(this.folder=='Outbox'){
    
        this.foldername="CATEGORIAS"
    
      }
      if(this.folder=='Favorites'){
        this.foldername="PERFIL"
      
      }
      if(this.folder=='Archived'){
        this.foldername="LISTA DE DESEOS"
      }
      if(this.folder=='Spam'){
        this.foldername="CONTACTANOS"
      }
  
      
    this.inL=this.autS.isAuthenticated();
    this.login = this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        Validators.email
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(150)
      ])
    });
                                    //Otras cosas
                           
                              
    }
}
