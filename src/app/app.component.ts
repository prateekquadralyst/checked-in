import { Component } from '@angular/core';
import { NavigationService } from './services/navigation.service';
import { UserService } from './api-services/user.service';
import * as firebase from 'firebase/compat/app';
import  'firebase/auth';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'timeline', url: 'timeline', icon: 'alarm' },
    { title: 'Profile', url: 'profile', icon: 'person' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  currentUser: any;
  constructor(
    private navigationService: NavigationService,
    private userService: UserService
  ) {}

  checkAuth() {
    firebase.default.auth().onAuthStateChanged(user => {
      if (user) {
        this.userService.setCurrentuserData(user.uid).subscribe(logedInInfo => {
          this.currentUser = logedInInfo;
        });
      }
    });
  }

  public navigateTo(url: string): void{
    this.navigationService.navigateTo(url);
  }
}
