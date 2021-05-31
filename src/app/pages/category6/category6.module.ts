import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Category6PageRoutingModule } from './category6-routing.module';

import { Category6Page } from './category6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Category6PageRoutingModule
  ],
  declarations: [Category6Page]
})
export class Category6PageModule {}
