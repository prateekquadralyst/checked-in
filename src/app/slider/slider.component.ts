import { Component, OnInit } from '@angular/core';
import { NavigationService} from '../services/navigation.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  slides: any;

  constructor(
    private routerServices: NavigationService
  ) {}

  public navigateTo(): void{
    this.routerServices.navigateTo('registration');
  }
}
