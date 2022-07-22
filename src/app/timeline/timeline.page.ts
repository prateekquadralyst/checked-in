import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../api-services/profile.service';
import { NavigationService } from '../services/navigation.service';
import { GlobalService } from '../services/global.service';
import { UserService } from '../api-services/user.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  constructor(
    private profileService: ProfileService,
    private navigationService: NavigationService,
    private globalService: GlobalService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  async logout(): Promise<void>{
    alert('+====================');
    await this.userService.logout();
    this.globalService.showLoading(true);
    setTimeout(() => {
      this.globalService.hideLoading();
    }, 2000);
    if(this.logout){
      this.navigationService.navigateTo('login');
      console.log('Logout Successfull');
    } else {
      console.log('Logout unsuccessfull*************');
    }
  }

}
