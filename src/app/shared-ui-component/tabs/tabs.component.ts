import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  constructor(
    private navigationService: NavigationService
  ) { }

  ngOnInit() {}

  public navigateTo(url){
    this.navigationService.navigateTo(url);
  }

}
