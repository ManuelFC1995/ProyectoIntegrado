import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { cart } from 'src/app/model/cart';
import { Localidad } from 'src/app/model/Localidad';
import { Pedido } from 'src/app/model/Pedido';
import { ApiService } from 'src/app/Services/api.service';
import { AuxService } from 'src/app/Services/aux.service';

import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
})
export class DireccionPage implements OnInit {
  public tasks: FormGroup;
  public tasks1: FormGroup;
  public tasks2: FormGroup;
  private valid: boolean;
  cart: cart| null = {
    id_cliente: undefined,
    productos:undefined
    
  };
  Direccion={
    Región :undefined,
    Provincia:undefined,
    CP: undefined,
    Calle:undefined,
    num: undefined,
    Puerta:undefined,
    telefono:undefined,
}
  usuario:any;
  
Localidades:Localidad[]=[];
Region;
Localidad:Localidad ={name: "",cp:"00"};
 Álava:Localidad ={name: "Álava",cp:"01"}
 Albacete:Localidad ={name: "Albacete",cp:"02"}
 Alicante:Localidad={ name: "Alicante", cp:"03"}
 Almería:Localidad={ name: "Almería", cp:"04"}
 Ávila:Localidad={ name: "Ávila", cp:"05"}
  Badajoz:Localidad ={name: " Badajoz",cp:"06"}
 IslasBaleares:Localidad ={name: "Islas Baleares",cp:"07"}; Menorca:Localidad ={name: "Menorca",cp:"07"}; Mallorca:Localidad ={name: "Mallorca",cp:"07"}; Ibiza:Localidad ={name: "Ibiza",cp:"07"}; Formentera:Localidad ={name: "Formentera",cp:"07"}; 
 Barcelona:Localidad={ name: "Barcelona", cp:"08"}
 Burgos:Localidad={ name: "Burgos", cp:"09"}
   Cáceres:Localidad={ name: "Cáceres", cp:"10"}

 Cádiz:Localidad ={name: "Cádiz",cp:"11"}
 Castellón:Localidad ={name: "Castellón",cp:"12"}
 CiudadReal:Localidad={ name: "Ciudad Real", cp:"13"}
 Córdoba:Localidad={ name: "Córdoba", cp:"14"} 
 LaCoruña:Localidad={ name: "La Coruña", cp:"15"}
  Cuenca:Localidad ={name: "Cuenca",cp:"16"}
 Gerona:Localidad ={name: "Gerona",cp:"17"}
 Granada:Localidad={ name: "Granada", cp:"18"}
 Guadalajara:Localidad={ name: "Guadalajara", cp:"19"}
  Guipúzcoa:Localidad={ name: "Guipúzcoa", cp:"20"}

 Huelva:Localidad ={name: "Huelva",cp:"21"}
 Huesca:Localidad ={name: "Huesca",cp:"22"}
 Jaén:Localidad={ name: "Jaén", cp:"23"}
 León:Localidad={ name: "León", cp:"24"}
 Lérida:Localidad={ name: "Lérida", cp:"25"}
  LaRioja:Localidad ={name: "La Rioja",cp:"26"}
  Lugo:Localidad ={name: "Lugo",cp:"27"}
 Madrid:Localidad={ name: "Madrid", cp:"28"}
 Málaga:Localidad={ name: "Málaga", cp:"29"}
  Murcia:Localidad={ name: "Murcia", cp:"30"}

  Navarra:Localidad ={name: "Navarra",cp:"31"}
  Orense:Localidad ={name: "Orense",cp:"32"}
  Asturias:Localidad={ name: "Asturias", cp:"33"} ;   Gijón:Localidad={ name: "Gijón", cp:"33"};  Oviedo:Localidad={ name: "Oviedo", cp:"33"};  Avilés:Localidad={ name: "Avilés", cp:"33"};
  Palencia:Localidad={ name: "Palencia", cp:"34"}
  LasPalmas:Localidad={ name: "Las Palmas", cp:"35"};Lanzarote:Localidad={ name: "Lanzarote", cp:"35"}
  Pontevedra:Localidad ={name: "Pontevedra",cp:"36"}
  Salamanca:Localidad ={name: "Salamanca",cp:"37"}
  Tenerife:Localidad={ name: " Santa Cruz de Tenerife", cp:"38"}; ElHierro:Localidad={ name: "El Hierro", cp:"38"}; LaPalma:Localidad={ name: "La palma", cp:"38"};
  Cantabria:Localidad={ name: "Cantabria", cp:"39"}; Santander:Localidad={ name: "Santander", cp:"39"};
  Segovia:Localidad={ name: "Segovia", cp:"40"}

  Sevilla:Localidad ={name: "Sevilla",cp:"41"}
  Soria:Localidad ={name: "Soria",cp:"42"}
  Tarragona:Localidad={ name: "Tarragona", cp:"43"}
  Teruel:Localidad={ name: " Teruel", cp:"44"}
  Toledo:Localidad={ name: "Toledo", cp:"45"}
  Valencia:Localidad ={name: "Valencia",cp:"46"}
  Valladolid:Localidad ={name: "Valladolid",cp:"47"}
  Vizcaya:Localidad={ name: "Vizcaya", cp:"48"}
  Zamora:Localidad={ name: "Zamora", cp:"49"}
  Zaragoza:Localidad={ name: "Zaragoza", cp:"50"}
  Ceuta:Localidad={ name: "Ceuta", cp:"51"}
  Melilla:Localidad={ name: "Melilla", cp:"52"}

public Regiones:string[]=["Andalucía","Aragón","Principado de Asturias","Illes Balears","Canarias","Cantabria","Castilla y León",
"Castilla-La Mancha","Cataluña","Comunitat Valenciana","Extremadura","Galicia","Comunidad de Madrid","Región de Murcia",
"Comunidad Foral de Navarra","País Vasco","La Rioja","Ciudad Autónoma de Ceuta","Ciudad Autónoma de Melilla"];

  constructor(private route: ActivatedRoute,
    private apiS:ApiService,
    private navCtrl: NavController,
    private nativeS:NativeStorage,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
   public loadingCtrl: LoadingService,
   private router :Router,
   private formBuilder: FormBuilder,
   private aux:AuxService) { 

    this.tasks = this.formBuilder.group({

      Provincia: [''],
      CP: [''],
      Calle: [''],
      numero: [''],
      Teléfono: [''],
      puerta: [''],
    })

    this.tasks1 = this.formBuilder.group({
      CA: [''],
    })


    this.tasks2 = this.formBuilder.group({
      Provincia: [''],
    })
    
   
   }

  async ngOnInit() {

    this.tasks = this.formBuilder.group({
    
      CP: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^(?=.*['+this.Localidad.cp+'])([0-9]+)$'),
        Validators.minLength(5),
        Validators.maxLength(10)
      ]),
      Calle: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])([a-zA-Z]+)$'),
        Validators.minLength(4),
        Validators.maxLength(150)
      ]),
      numero: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])([0-9]+)$'),
        Validators.minLength(1),
        Validators.maxLength(3)
      ]),
      Teléfono: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])([0-9]+)$'),
        Validators.minLength(9),
        Validators.maxLength(9)
      ]),
      puerta: this.formBuilder.control('', [
      
      ])
    });
  }

  async onSubmit() {
    this.sendForm();
   
    }


    public change1(){
      this.Region=this.tasks1.get('CA').value;
      this.GetCiudades();
      console.log(this.Region);
    }


    public change2(){
      this.Localidad=this.tasks2.get('Provincia').value;
      console.log(this.Localidad);
    }




     /**
* Metodo que ENVIA EL FORMULARIO DE DIRECCION,guarda la direccion en el aux.service

* @param  Direccion  Direccion del pedido
*/
    public async sendForm() {

this. Direccion={
  Región :this.tasks1.get('CA').value,
  Provincia:this.tasks2.get('Provincia').value,
  CP:this.tasks.get('CP').value,
  Calle:this.tasks.get('Calle').value,
  num: this.tasks.get('numero').value,
  Puerta:this.tasks.get('puerta').value,
  telefono:this.tasks.get('Teléfono').value,
}

this.aux.setDireccion(this.Direccion);
console.log(this.Direccion);
      this.router.navigate(['/pagos'])
    
    }

//BAckBUtton
  public atras() {
    this.aux.CleanDireccion();
    this.navCtrl.back();
  }


 /**
* Metodo que carga las ciudades de cada comunidad autonoma

* @param  Region  comunidad autonoma
* @param  Localidades Ciudades de esa region
*/
GetCiudades(){

  if(this.Region==null){
    this.Localidades=[]
  }
  if(this.Region=="Andalucía"){
    this.Localidades=[this.Almería,this.Cádiz,this.Córdoba,this.Jaén,this.Huelva,this.Sevilla,this.Granada,this.Málaga]
  }
  if(this.Region=="Aragón"){
    this.Localidades=[this.Huesca,this.Teruel,this.Zaragoza]
  }
  if(this.Region=="Principado de Asturias"){
    this.Localidades=[this.Gijón,this.Oviedo,this.Avilés,this.Asturias]
  }

  if(this.Region=="Illes Balears"){
    this.Localidades=[this.Menorca,this.Mallorca,this.Ibiza,this.Formentera]
  }

  if(this.Region=="Canarias"){
    this.Localidades=[this.LasPalmas,this.Tenerife,this.Lanzarote,this.ElHierro,this.LaPalma]
  }
  if(this.Region=="Cantabria"){
    this.Localidades=[this.Cantabria,this.Santander]
  }
 
  if(this.Region=="Castilla y León"){
    this.Localidades=[]
  }

  if(this.Region=="Castilla-La Mancha"){
    this.Localidades=[this.Ávila,this.Burgos,this.León,this.Soria,this.Segovia,this.Palencia,this.Valladolid,this.Zamora]
  }

  if(this.Region=="Cataluña"){
    this.Localidades=[this.Barcelona,this.Gerona,this.Tarragona,this.Gerona,this.Lérida]
  }


  if(this.Region=="Comunitat Valenciana"){
    this.Localidades=[this.Castellón,this.Valencia,this.Alicante]
  }
  if(this.Region=="Extremadura"){
    this.Localidades=[this.Badajoz,this.Cáceres]
  }

  if(this.Region=="Castilla-La Mancha"){
    this.Localidades=[this.Albacete,this.CiudadReal,this.Toledo,this.Cuenca,this.Guadalajara]
  }

  if(this.Region=="Comunidad de Madrid"){
    this.Localidades=[this.Madrid]
  }

  if(this.Region=="Región de Murcia"){
    this.Localidades=[this.Murcia]
  }
  if(this.Region=="Comunidad Foral de Navarra"){
    this.Localidades=[this.Navarra]
  }

  if(this.Region=="País Vasco"){
    this.Localidades=[this.Vizcaya,this.Álava,this.Guipúzcoa]
  }

  if(this.Region=="La Rioja"){
    this.Localidades=[this.LaRioja]
  }

  if(this.Region=="Ciudad Autónoma de Ceuta"){
    this.Localidades=[this.Ceuta]
  }

  if(this.Region=="Ciudad Autónoma de Melilla"){
    this.Localidades=[this.Melilla]
  }

}
}
