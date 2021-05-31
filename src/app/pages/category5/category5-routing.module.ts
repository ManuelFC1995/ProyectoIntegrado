import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Category5Page } from './category5.page';

const routes: Routes = [
  {
    path: '',
    component: Category5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Category5PageRoutingModule {}
