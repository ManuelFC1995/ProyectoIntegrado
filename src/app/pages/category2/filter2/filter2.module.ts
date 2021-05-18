import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Filter2PageRoutingModule } from './filter2-routing.module';

import { Filter2Page } from './filter2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Filter2PageRoutingModule
  ],
  declarations: [Filter2Page]
})
export class Filter2PageModule {}
