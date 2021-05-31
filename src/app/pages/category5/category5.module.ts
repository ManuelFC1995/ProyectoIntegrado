import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Category5PageRoutingModule } from './category5-routing.module';

import { Category5Page } from './category5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Category5PageRoutingModule,ReactiveFormsModule
  ],
  declarations: [Category5Page]
})
export class Category5PageModule {}
