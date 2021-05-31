import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { cart } from 'src/app/model/cart';
import { Cliente } from 'src/app/model/Cliente';
import { Producto } from 'src/app/model/Producto';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


//-----------------CLASE DE LOGIN------------------------//
export class LoginPage implements OnInit {
  login: FormGroup;
  userdata: any;
  user:Cliente;
  GooglePlay:string="assets/IMG/Playstore.png"
  FacebookLogo:string="assets/IMG/logo-facebook.png"
  GoogleLogo="assets/IMG/google-logo.png"
 mensaje = false;

  constructor(
    private fb: FormBuilder,private navCtrl: NavController,private google:GooglePlus,
    private authS:AuthService,private router:Router,  
    private modalController:ModalController,private activatedRouter: ActivatedRoute,private nativeS:NativeStorage)
     { }

  onLogin() {
    if (this.login.valid) {
      console.log(this.login.value);
    }
  }


    /**
* Metodo que COMPRUEBA SI HAY UN USUARIO YA LOGUEADO

* @param authS  VALOR BOOLEANO DE LA RESPUESTA

*/
  isAuth() {
    return this.authS.isAuthenticated();
    }



        /**
* INIZIALIZA LA VALIDACION DEL FORMULARIO
*/
  ngOnInit() {
  
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
  }


      /**
* Metodo que INICIA SESION CON CORREO Y CONTRASEÑA

* @param userdata VALOR DE LOS CAMPOS CORREO Y CONTRASEÑA

*/
  async onSubmit() {
    this.userdata = this.saveUserdata();
    this.authS.inicioSesion(this.userdata);

    setTimeout(() => {
    if (this.isAuth() === false) {
    this.mensaje = true
    }
    }, 2000);
    }


  //Obtiene el correo y contraseña
    saveUserdata() {
      const saveUserdata = {
      email: this.login.get('email').value,
      password: this.login.get('password').value,
      };
      return saveUserdata;
      }


        /**
* Metodo que inicia sesion con el metodo de Google 
y lo guarda en el almacenamiento local (Native storage),
Si es la primera vez que se inicia sesion se crea el cliente en la base de datos y sino lo actualiza 
por si hay cambios en la cuenta de google

realizará un SetItem ->  this.storage.getItem("userGoogle");
realizará un SetItem ->  this.storage.getItem("userApi");
*/
      public async loginGoogle(){
        let u=await this.authS.loginGoogle();
        if(u.token!=-1){
         console.log(u);
        }else{
          console.log("no hay ");
        }
      }
}
