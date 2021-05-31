import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'man',
    loadChildren: () => import('./pages/man/man.module').then( m => m.ManPageModule)
  },
  {
    path: 'category1',
    loadChildren: () => import('./pages/category1/category1.module').then( m => m.Category1PageModule)
  },
  {
    path: 'category2',
    loadChildren: () => import('./pages/category2/category2.module').then( m => m.Category2PageModule)
  },
  {
    path: 'category3',
    loadChildren: () => import('./pages/category3/category3.module').then( m => m.Category3PageModule)
  },
  {
    path: 'category4',
    loadChildren: () => import('./pages/category4/category4.module').then( m => m.Category4PageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'producto/:id',
    loadChildren: () => import('./pages/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'direccion',
    loadChildren: () => import('./pages/direccion/direccion.module').then( m => m.DireccionPageModule)
  },
  {
    path: 'pagos',
    loadChildren: () => import('./pages/pagos/pagos.module').then( m => m.PagosPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pages/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'category5',
    loadChildren: () => import('./pages/category5/category5.module').then( m => m.Category5PageModule)
  },
  {
    path: 'category6',
    loadChildren: () => import('./pages/category6/category6.module').then( m => m.Category6PageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
