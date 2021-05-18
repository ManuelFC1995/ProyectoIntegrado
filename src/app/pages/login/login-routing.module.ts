import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),  CommonModule,
    IonicModule],
   
  exports: [RouterModule,LoginPage],
})
export class LoginPageRoutingModule {}
