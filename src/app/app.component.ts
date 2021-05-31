import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import * as firebase from 'firebase';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
isLogin:boolean;
imagenLogo = "/assets/IMG/Logo.png";


  public appPages = [
    { title: 'HOME', url: '/folder/Inbox', icon: 'home' },
    { title: 'CATEGORIAS', url: '/folder/Outbox', icon: 'apps' },
   { title: 'PERFIL', url: '/folder/Favorites', icon: 'people' },
    { title: 'LISTA DE DESEOS', url: '/folder/Archived', icon: 'archive' },
    { title: 'CONTACTANOS', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = [];
  constructor(  private platform: Platform,private splashScreen: SplashScreen,private router: Router,
    private authS:AuthService) {
      this.initializeApp();
    }



    initializeApp() {
 
    
  
      this.platform.ready().then(async () => {
   this.authS.init();
 
        this.splashScreen.hide();
   
      });
    }
  


  async ngOnInit(): Promise<void> {
    if(!this.authS.isAuthenticated){
      this.appPages = [
        { title: 'HOME', url: '/folder/Inbox', icon: 'home' },
        { title: 'CATEGORIAS', url: '/folder/Outbox', icon: 'apps' },
       { title: 'LOGIN', url: '/folder/Favorites', icon: 'people' },
        { title: 'LISTA DE DESEOS', url: '/folder/Archived', icon: 'archive' },
        { title: 'CONTACTANOS', url: '/folder/Spam', icon: 'warning' },
      ];
    }
    firebase.initializeApp({
      apiKey: "AIzaSyDD2nDKh11H9qgeUy_UPc_AHWg2DRmAE20",
      authDomain:"vianco-cdb35.firebaseapp.com"
      });


    console.log(this.isLogin);
  }

  isL(){
    return this.authS.isAuthenticated();
  }
  FakeLogin(){
   environment.IsLogin=true;
  }
  onSubmit() {
    environment.IsLogin=true;
    this.isLogin=true;
  }
  async Logaut(){
    this.authS.logout();
    this.isLogin= await this.authS.isAuthenticated();
  }
}
