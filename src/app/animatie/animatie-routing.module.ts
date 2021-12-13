import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimatiePage } from './animatie.page';

const routes: Routes = [
  {
    path: '',
    component: AnimatiePage
  },
  {
    path: 'detail',
    loadChildren: () => import('../Animatie/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('../Animatie/detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimatiePageRoutingModule {}
