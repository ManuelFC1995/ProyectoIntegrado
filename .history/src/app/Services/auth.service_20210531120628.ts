import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { cart } from '../model/cart';
import { Cliente } from '../model/Cliente';
import { Producto } from '../model/Producto';
import { ApiService } from './api.service';
import { LoadingService } from './loading.service';
@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  //usuario firebase
  user: any =null;
  public userGoogle = {
    token: -1,
    name: '',
    userId:'',
    avatar: '',
    Email:''

  }
  ProductosCarrito:Producto[]=[];
  cart: cart| null = {
    id_cliente: undefined,
    productos:undefined
    
  };
  //Usuario Api
  userApi: Cliente;


  public ClienteGoogle: Cliente =null;


  constructor(private router: Router, private storage: NativeStorage,
    private activatedRouter: ActivatedRoute, private LoadingService: LoadingService,
    private api: ApiService, private google: GooglePlus,private navcontroller: NavController) {

  }
                      /**
* Metodo que recupera los usuarios del almacenamiento local del telefono

* @param  this.user   usuario de firebase si lo hay
* @param  this.userGoogle   usuario de google si lo hay
* @param  this.userApi  usuario del backend si lo hay
* @param  storage almacenamiento local
           realizará un getItem ->  this.storage.getItem("user");
           realizará un getItem ->  this.storage.getItem("userGoogle");
           realizará un getItem ->  this.storage.getItem("userApi");
*/
  async init() {

    let u = null;
    let uG = null;
    let uA=null;
    try {
      u = await this.storage.getItem("user");
      this.user = u;
    } catch (err) {
      u = null;
      this.user = u;
    }
    try {
      uG = await this.storage.getItem("userGoogle");
      this.userGoogle = uG;
    } catch (err) {
     this.userGoogle = {
        token: -1,
        name: '',
        userId:'',
        avatar: '',
        Email:''
      }
      this.userGoogle = uG;
    }
    try {
      uA = await this.storage.getItem("userApi");
      this.userApi = uA;
    } catch (err) {
      uA = null;
      this.userApi = uA;
    }

    console.log(u);
  }

  //Registra el asuario en Firebase
  registroUsuario(userdata): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(userdata.email,
      userdata.password)
  }

                      /**
* Metodo que inicia sesion con el metodo usuario y contraseña previamente registrado 
y lo guarda en el almacenamiento local (Native storage)

* @param  this.user   usuario de firebase
* @param  this.userApi  usuario del backend si lo hay
* @param  storage almacenamiento local
           realizará un SetItem ->  this.storage.getItem("user");
           realizará un SetItem ->  this.storage.getItem("userApi");
*/
  async inicioSesion(userdata) {
    firebase.auth().signInWithEmailAndPassword(userdata.email,
      userdata.password)
      .then(async response => {
        this.userApi = await this.api.getUserId(response.user.uid);
        console.log(this.userApi);
        this.user = firebase.auth().currentUser;
        await this.storage.setItem("user", this.user);
        await this.storage.setItem("userApi", this.userApi);

        this.cart={
          id_cliente: this.userApi.id,
          productos:this.ProductosCarrito
        }
        console.log(this.cart);
        await this.storage.setItem("cart", this.cart);
        this.navcontroller.navigateRoot("/");
       
      })
      .catch(
        error => {
          console.log(error);
        })
    return this.user;
  }

  
//Devuelve false si no hay un usuario registrado y true si lo hay
  isAuthenticated() {

    if (this.userApi!=null) {
      console.log("autenticado con"+this.userApi.email)
      return true;
    } else {
      console.log("No esta autenticado")
     return false;
    }
  }



                        /**
* Metodo que cierra sesion independeintemente del metodo usado para loguearse
y lo guarda en el almacenamiento local (Native storage) los usuarios a null.

* @param  this.user   usuario de firebase si lo hay
* @param  this.userApi  usuario del backend 
* @param  this.userGoogle   usuario de google si lo hay
* @param  storage almacenamiento local
        
*/
  async logout() {
    try{
      let u= await this.storage.getItem("user");
      console.log(u);
      if(u){
        console.log("entra en desloguear con firebase");
       firebase.auth().signOut();
       this.user = null;
       this.userGoogle = {
        token: -1,
        name: '',
        userId:'',
        avatar: '',
        Email:''
      }
       await this.storage.setItem("user", this.user);
       this.userApi = {
         id: undefined,
         name: undefined,
         email:undefined
       }
      
      }
       let uG= await this.storage.getItem("userGoogle");
       if(uG.token){
          if(uG.token != -1){
            console.log("entra en desloguear con Google");
            let u =  this.google.logout();
            this.userGoogle = {
              token: -1,
              name: '',
              userId:'',
              avatar: '',
              Email:''
            }
            await this.storage.setItem("userGoogle",this.userGoogle);
          }
       }

    }catch(err){
    
    }
  
    this.userApi=null;
    await this.storage.setItem("userApi", this.userApi);
    this.cart=null;
    console.log(this.cart);
    await this.storage.setItem("cart", this.cart);
    this.navcontroller.navigateRoot("/login");
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log("ESTOY EN CANACTIVATE Y EL RESULT ES " + this.isAuthenticated())
    if (!this.isAuthenticated()) {
      this.router.navigate(["auth"]);
      return false;
    }
    return true;
  }

  getUser() {
    const user = firebase.auth().currentUser;
    return user;
  }


  public async loginGoogle() {
  this.LoadingService.presentLoading();
    try {
      let u = await this.google.login({})
      console.log(u) 
      if (u) {
        console.log("OK")  
        this.userGoogle = {
          token: u['accessToken'],
          name: u['displayName'],
          userId:u['userId'],
          avatar: u['imageUrl'],
          Email: u['email']
        }
        console.log(this.userGoogle);
        try{
          this.userApi =await this.api.getUserId(this.userGoogle.userId);
          this.api.updateItem(  this.userApi);
          await this.storage.setItem("userApi",  this.userApi);
          console.log("EL usuario ya esta registrado en la api");
          this.cart={
            id_cliente: this.userApi.id,
            productos:this.ProductosCarrito
          }
          console.log(this.cart);
          await this.storage.setItem("cart", this.cart);
          await this.storage.setItem("userGoogle",this.userGoogle);
          await this.storage.setItem("userApi", this.userApi);
          this.LoadingService.loadingController.dismiss();
          this.navcontroller.navigateRoot("/");
        }catch(err){
          this.ClienteGoogle.name= this.userGoogle.name ,
          this.ClienteGoogle.email=this.userGoogle.Email,
         this.ClienteGoogle.id= this.userGoogle.userId;
     
         this.api.createUser(this.ClienteGoogle);
         this.cart={
          id_cliente: this.userGoogle.userId,
          productos:this.ProductosCarrito
        }
        console.log(this.cart);
        await this.storage.setItem("cart", this.cart);
        this.userApi=await this.api.getUserId(this.userGoogle.userId);
        await this.storage.setItem("userApi",this.userApi);
         console.log("EL usuario ha sido registrado en la api");
         await this.storage.setItem("userGoogle",this.userGoogle);
         this.LoadingService.loadingController.dismiss();
         this.navcontroller.navigateRoot("/");
        }
      }
    } catch (err) {
      console.log(err);
      this.userGoogle = {
        token: -1,
        name: '',
        avatar: '',
        userId:'',
        Email:''
      }
      this.LoadingService.loadingController.dismiss();
    }
    await this.storage.setItem("userGoogle",this.userGoogle);

    return this.userGoogle;
  }

  public async logoutGoogle(){
    let u =  this.google.logout();
    this.userGoogle = {
      token: -1,
      name: '',
      userId:'',
      avatar: '',
      Email:''
    }
    await this.storage.setItem("userGoogle",this.userGoogle);
    this.userApi = {
      id: undefined,
      name: undefined,
      email:undefined
    };
  }
  getUserGoogle(){
    return this.userGoogle;
  }
}