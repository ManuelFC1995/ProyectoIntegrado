import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManPageRoutingModule } from './man-routing.module';

import { ManPage } from './man.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManPageRoutingModule
  ],
  declarations: [ManPage]
})
export class ManPageModule {}
