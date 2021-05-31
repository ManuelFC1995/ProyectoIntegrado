import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { cart } from 'src/app/model/cart';
import { Cliente } from 'src/app/model/Cliente';
import { Producto } from 'src/app/model/Producto';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';

import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

//-----------------CLASE DE REGISTRO CORREO Y CONTRASEÑA------------------------//
export class RegisterPage implements OnInit {
  public Cliente: Cliente | null = {
    name: undefined,
    email: undefined,
    pedidos: undefined,
  }

  register: FormGroup;
  userdata: any;


  erroresForm = {
    'email': '',
    'password': ''
  }
  mensajesValidacion = {
    'first_name': {
      'required': 'Nombre de usuario Obligatorio',
      'first_name': 'Introduzca un nombre válido'
    },
    'email': {
      'required': 'Email obligatorio',
      'email': 'Introduzca una dirección email correcta'
    },
    'password': {
      'required': 'Contraseña obligatoria',
      'pattern': 'La contraseña debe tener al menos una letra un número ',
      'minlength': 'y más de 6 caracteres'
    }
  }


  constructor(
    private fb: FormBuilder, private formBuilder: FormBuilder,
    private autService: AuthService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private LoadingS: LoadingService,
    private apiS: ApiService,
    private NativeStorage: NativeStorage

  ) { }

  onRegister() {
    if (this.register.valid) {
      console.log(this.register.value);
    }
  }


  /**
* Metodo que REGISTRA EL USUARIO EN FIREBASE  Y LO CREA EN LA BASE DE DATOS

* @param Usuario  Usuario de firebase
* @param  Cliente Usuario de la base de datos
*/
  async onSubmit() {
    this.LoadingS.presentLoading();
    this.userdata = this.saveUserdata();

    try {
      let Usuario = await this.autService.registroUsuario(this.userdata);
      this.Cliente.name = this.register.get('first_name').value,
        this.Cliente.email = this.register.get('email').value,
        this.Cliente.id = Usuario.user.uid;

      this.apiS.createUser(this.Cliente);
      this.router.navigate(['/login'])
    } catch {
      this.LoadingS.presentToast("El usuario ya existe en esta aplicación", "#ff7f50");
    }
    this.LoadingS.Dismiss();
  }


  //Iniciaiza la validacion del formulario
  ngOnInit() {
    this.register = this.fb.group({
      first_name: this.fb.control('', [
        Validators.required,
        Validators.maxLength(20)
      ]),

      email: this.fb.control('', [
        Validators.required,
        Validators.email
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(8),
        Validators.maxLength(150)
      ]),
      password_confirm: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150)
      ])
    }, {
      validators: this.passwordConfirmMatchValidator
    });
    this.register.valueChanges.subscribe(data =>
      this.onValueChanged(data));
    this.onValueChanged();


  }

  //Validacion de la contraseña
  passwordConfirmMatchValidator(g: FormGroup) {
    const password = g.get('password');
    const password_confirm = g.get('password_confirm');

    if (password_confirm.hasError('required') || password_confirm.hasError('minlength')) return;

    if (password.value !== password_confirm.value) {
      password_confirm.setErrors({
        mismatch: true
      });
    } else {
      password_confirm.setErrors(null);
    }
  }




  //Obtiene el correo y contraseña
  saveUserdata() {
    const saveUserdata = {
      email: this.register.get('email').value,
      password: this.register.get('password').value,
    };
    return saveUserdata;
  }

  saveUserName() {
    const saveUsername = {
      name: this.register.get('first_name').value,
    };
    return saveUsername;
  }



  onValueChanged(data?: any) {
    if (!this.register) { return; }
    const form = this.register;
    for (const field in this.erroresForm) {

      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesValidacion[field];
        for (const key in control.errors) {
          this.erroresForm[field] += messages[key] + ' ';
        }
      }
    }
  }

}
