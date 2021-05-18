import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Filter3Page } from './filter3.page';

const routes: Routes = [
  {
    path: '',
    component: Filter3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Filter3PageRoutingModule {}
