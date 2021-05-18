import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Filter4PageRoutingModule } from './filter4-routing.module';

import { Filter4Page } from './filter4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Filter4PageRoutingModule
  ],
  declarations: [Filter4Page]
})
export class Filter4PageModule {}
