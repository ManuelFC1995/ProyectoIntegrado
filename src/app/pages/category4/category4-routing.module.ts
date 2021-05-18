import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Category4Page } from './category4.page';

const routes: Routes = [
  {
    path: '',
    component: Category4Page
  },
  {
    path: 'filter4',
    loadChildren: () => import('./filter4/filter4.module').then( m => m.Filter4PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Category4PageRoutingModule {}
