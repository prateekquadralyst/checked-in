import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../api-services/profile.service';
import { NavigationService } from '../services/navigation.service';
import { GlobalService } from '../services/global.service';
import { UserService } from '../api-services/user.service';
import { ScrollHideConfig } from '../header.directive';
import { ModalController } from '@ionic/angular';
import { runInThisContext } from 'vm';
import * as firebase from 'firebase/compat/app';
import  'firebase/auth';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  currentUser: any;
  profileImage: any;
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 60 };

  timelineData: any;

  constructor(
    private profileService: ProfileService,
    private navigationService: NavigationService,
    private globalService: GlobalService,
    private userService: UserService,
    private modalCtrl: ModalController,
  ) {
    this.checkAuth();
    this.timelineData = [
      {
        name: "Spider Man",
        about: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!",
        image: "../../../assets/1.jpg",
        time: "12:00",
        imagePost: "../../../assets/2.jpg",
        post: "Hello dude have seen this great UI Elemnt  ",
        like: 3,
        comment: 0
      },
      {
        name: "Bat Man",
        about: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!",
        image: "../../../assets/1.jpg",
        time: "12:03",
        imagePost: "../../../assets/2.jpg",
        post: "Yeah, I see pagas this. This looks great. ",
        like: 1,
        comment: 2
      },
      {
        name: "Hulk",
        about: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!",
        image: "../../../assets/1.jpg",
        imagePost: "../../../assets/2.jpg",
        time: "12:03",
        post: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!",
        like: 7,
        comment: 5
      },
      {
        name: "Mistirio",
        about: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente!",
        image: "../../../assets/1.jpg",
        imagePost: "../../../assets/2.jpg",
        time: "12:03",
        post: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim laboriosam sunt nulla minima ratione, pariatur quaerat aut ex a ullam? Officia, explicabo optio. Dolores, ab exercitationem? Neque illo soluta sapiente! ",
        like: 22,
        comment: 5
      },
    ]
  }

  ngOnInit() {
  }
  
  checkAuth() {
    this.globalService.showLoading(true);
    firebase.default.auth().onAuthStateChanged(user => {
      if (user) {
        this.userService.setCurrentuserData(user.uid).subscribe(logedInInfo => {
          // console.log('((((((((@@@@@)))))))',logedInInfo);
          this.currentUser= logedInInfo;
          this.profileImage = (!this.currentUser.photo || this.currentUser.photo === '') ? '../../assets/avatar.png' : this.currentUser.photo ;
          this.globalService.hideLoading();
          console.log('((((((((&&&&&&&&&&&&&&&&&&&&&&&&&)))))))', this.currentUser);
        });
      }
    });
  }
  public navigateTo(url: string): void {
    this.navigationService.navigateTo(url);
  }

}
