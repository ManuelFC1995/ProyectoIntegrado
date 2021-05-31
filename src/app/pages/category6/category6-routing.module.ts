import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Category6Page } from './category6.page';

const routes: Routes = [
  {
    path: '',
    component: Category6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Category6PageRoutingModule {}
