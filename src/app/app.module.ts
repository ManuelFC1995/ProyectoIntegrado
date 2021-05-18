import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, LoadingController } from '@ionic/angular';
import Commerce from '@chec/commerce.js'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommerceService } from './Services/commerce.service';
import { AuthService } from './Services/auth.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {LottieModule} from 'ngx-lottie';
import player from 'lottie-web';
import { FormsModule } from '@angular/forms';
import { LoadingService } from './Services/loading.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { DatePipe } from '@angular/common'
export function PlayerFactory(){
return player;
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  
  imports: [ HttpClientModule,LottieModule.forRoot({
    player:PlayerFactory
  }),
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    FormsModule,
    ReactiveFormsModule],
 
 
    providers: [HTTP,HttpClient,
    CommerceService,DatePipe,
    AuthService, 
    SplashScreen,
    NativeStorage,
    FormBuilder,
    LoadingService,
    LoadingController,
    GooglePlus,
 
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy, 
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
