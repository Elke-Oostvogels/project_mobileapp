import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'animatie',
    loadChildren: () => import('./animatie/animatie.module').then( m => m.AnimatiePageModule)
  },
  {
    path: 'animatie',
    loadChildren: () => import('./animatie/animatie.module').then( m => m.AnimatiePageModule)
  },
  {
    path: 'safari',
    loadChildren: () => import('./safari/safari.module').then( m => m.SafariPageModule)
  },
  {
    path: 'safari',
    loadChildren: () => import('./safari/safari.module').then( m => m.SafariPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
