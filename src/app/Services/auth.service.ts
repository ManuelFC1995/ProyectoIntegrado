import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
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
  user: any;
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
  userApi: Cliente | null = {
    id: undefined,
    name: undefined,
 email:undefined
  };
  public ClienteGoogle: Cliente | null={
    id: undefined,
    name: undefined,
   
    email: undefined,
   
    pedidos:undefined,
}

  constructor(private router: Router, private storage: NativeStorage,
    private activatedRouter: ActivatedRoute, private LoadingService: LoadingService,
    private api: ApiService, private google: GooglePlus) {

  }
//recupera el usuario del native storage
  async init() {

    let u = null;
    try {
      u = await this.storage.getItem("user");
    } catch (err) {
      u = null;
    }
    if (u != null) {
      this.user = u;
    }
    if (u == null) {
     
    try {
      u = await this.storage.getItem("userGoogle");
    } catch (err) {
      u = null;
    }
    if (u != null) {
      this.userGoogle = u;
    }
    }
  }

  //Registra el asuario en Firebase
  registroUsuario(userdata): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(userdata.email,
      userdata.password)
  }

//Metodo para iniciar sesion
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
    
          id_cliente: this.user.id,
          productos:this.ProductosCarrito
          
        }
        console.log(this.cart);
        await this.storage.setItem("cart", this.cart);
        this.router.navigate(['/']);
      })
      .catch(
        error => {
          console.log(error);
        })
    return this.user;
  }

  
//Devuelve false si no hay un usuario registrado y true si lo hay
  isAuthenticated() {

    if (this.user!=null) {
      return true;
    } else {
      if (this.userGoogle.token == -1) {
        return false;
      } else {
        return true;
      }
    }
  }

  async logout() {
   let u= await this.storage.getItem("user");
   if(u){
    firebase.auth().signOut();
    this.user = null;
    this.userGoogle=null;
    await this.storage.setItem("user", this.user);
    this.userApi = {
      id: undefined,
      name: undefined,
      email:undefined
    };
   }


    let uG= await this.storage.getItem("userGoogle");
    if(uG.token != -1){
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
    await this.storage.setItem("userApi", this.userApi);
    this.cart=null;
    console.log(this.cart);
    await this.storage.setItem("cart", this.cart);
    this.router.navigate(['/login'])
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
          let uG =await this.api.getUserId(this.userGoogle.userId);
          this.api.updateItem(uG);
          console.log("EL usuario ya esta registrado en la api");
          this.router.navigate(['/']);
        }catch(err){
          this.ClienteGoogle.name= this.userGoogle.name ,
          this.ClienteGoogle.email=this.userGoogle.Email,
         this.ClienteGoogle.id= this.userGoogle.userId;
     
           
         
         this.api.createUser(this.ClienteGoogle);
         console.log("EL usuario ha sido registrado en la api");
         this.router.navigate(['/']);
        }
 
      }
    } catch (err) {
      this.userGoogle = {
        token: -1,
        name: '',
        avatar: '',
        userId:'',
        Email:''
      }
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
  }
  getUserGoogle(){
    return this.userGoogle;
  }
}