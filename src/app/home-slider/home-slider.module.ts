import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSliderPageRoutingModule } from './home-slider-routing.module';

import { HomeSliderPage } from './home-slider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSliderPageRoutingModule
  ],
  declarations: [HomeSliderPage]
})
export class HomeSliderPageModule {}
