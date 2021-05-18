import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Filter3PageRoutingModule } from './filter3-routing.module';

import { Filter3Page } from './filter3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Filter3PageRoutingModule
  ],
  declarations: [Filter3Page]
})
export class Filter3PageModule {}
