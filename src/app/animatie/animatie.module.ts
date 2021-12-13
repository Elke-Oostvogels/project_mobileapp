import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimatiePageRoutingModule } from './animatie-routing.module';

import { AnimatiePage } from './animatie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimatiePageRoutingModule
  ],
  declarations: [AnimatiePage]
})
export class AnimatiePageModule {}
