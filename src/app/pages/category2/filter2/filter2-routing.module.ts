import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Filter2Page } from './filter2.page';

const routes: Routes = [
  {
    path: '',
    component: Filter2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Filter2PageRoutingModule {}
