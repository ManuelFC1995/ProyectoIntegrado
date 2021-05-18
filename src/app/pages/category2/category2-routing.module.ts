import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Category2Page } from './category2.page';

const routes: Routes = [
  {
    path: '',
    component: Category2Page
  },
  {
    path: 'filter2',
    loadChildren: () => import('./filter2/filter2.module').then( m => m.Filter2PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Category2PageRoutingModule {}
