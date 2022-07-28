import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { UserService } from '../api-services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loadingTime = 0;
  submitLoading: any;

  loadingTimeSource = new BehaviorSubject(this.loadingTime);
  hideloadingTime = this.loadingTimeSource.asObservable();

  lodingStatus= false;

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    public userService: UserService,
  ) { }

  async showLoading(val) {
    if (this.lodingStatus === false) {
      console.log('start loding');
      this.lodingStatus = val;
      this.hideloadingTime.subscribe(async loadTime => {
        this.submitLoading = await this.loadingController.create({
          spinner: 'bubbles',
          duration: loadTime,
          message: 'Please wait...',
          translucent: true,
          cssClass: 'custom-class custom-loading'
        });
        this.submitLoading.duration = loadTime;
        return await this.submitLoading.present();
      });
    }
  }

  async hideLoading() {
    if (this.lodingStatus === true) {
      console.log('hide loding');
      this.submitLoading = await this.loadingController.dismiss();
      this.lodingStatus = false;
    }
  }

  async showToastMessage(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      position: 'top',
    });
    toast.present();
  }
}
