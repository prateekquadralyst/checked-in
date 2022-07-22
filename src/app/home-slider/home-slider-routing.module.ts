import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSliderPage } from './home-slider.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSliderPageRoutingModule {}
