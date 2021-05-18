import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Category3Page } from './category3.page';

const routes: Routes = [
  {
    path: '',
    component: Category3Page
  },
  {
    path: 'filter3',
    loadChildren: () => import('./filter3/filter3.module').then( m => m.Filter3PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Category3PageRoutingModule {}
