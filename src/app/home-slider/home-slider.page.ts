import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.page.html',
  styleUrls: ['./home-slider.page.scss'],
})
export class HomeSliderPage {
  slides: any;

  constructor(
    private routerServices: NavigationService
  ) { }


  public navigateTo(): void{
    this.routerServices.navigateTo('registration');
  }

}
