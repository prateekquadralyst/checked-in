import { Injectable } from '@angular/core';
import {
  NativePageTransitions,
  NativeTransitionOptions,
} from '@ionic-native/native-page-transitions/ngx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  loaded = false;
  tabIndex = 0;
  tabName: string;

  constructor(
    private nativePageTransitions: NativePageTransitions,
    public router: Router,
    public location: Location
  ) { }

  navigateTo(pageUrl) {
    const options: NativeTransitionOptions = {
      direction: 'down',
      duration: 600
    };

    // this.nativePageTransitions.flip(options);
    this.router.navigate([pageUrl]);
  }
  backTo() {
    const options: NativeTransitionOptions = {
      direction: 'up',
      duration: 600
    };

    // this.nativePageTransitions.flip(options);
    this.location.back();
  }
  navigateToWithData(pageUrl, data) {
    const options: NativeTransitionOptions = {
      direction: 'down',
      duration: 600
    };

    // this.nativePageTransitions.flip(options);
    this.router.navigate([pageUrl + '/' + data]);
  }

  private getAnimationDirection(index: number): string {

    const currentIndex = this.tabIndex;

    this.tabIndex = index;

    switch (true) {
      case (currentIndex < index):
        return ('left');
      case (currentIndex > index):
        return ('right');
    }
  }

}
