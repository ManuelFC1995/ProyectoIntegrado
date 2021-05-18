import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionPageRoutingModule } from './direccion-routing.module';

import { DireccionPage } from './direccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DireccionPageRoutingModule
  ],
  declarations: [DireccionPage]
})
export class DireccionPageModule {}
