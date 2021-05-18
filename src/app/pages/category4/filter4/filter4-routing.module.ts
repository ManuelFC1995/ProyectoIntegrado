import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Filter4Page } from './filter4.page';

const routes: Routes = [
  {
    path: '',
    component: Filter4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Filter4PageRoutingModule {}
