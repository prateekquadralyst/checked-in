import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { UserService } from 'src/app/api-services/user.service';
import { GlobalService } from 'src/app/services/global.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Plugins, CameraResultType, CameraSource, CameraOptions, CameraDirection } from '@capacitor/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor(
    private actionSheetController: ActionSheetController,
    private userService: UserService,
    private globalService: GlobalService,
    private navigationService: NavigationService
  ) { }

   // pickImage(sourceType) {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     sourceType: sourceType,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   };
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.croppedImagepath = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //   });
  // }


  // async selectImage() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Select Image source',
  //     buttons: [{
  //       text: 'Load from Library',
  //       handler: () => {
  //         this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  //       }
  //     },
  //     {
  //       text: 'Use Camera',
  //       handler: () => {
  //         this.pickImage(this.camera.PictureSourceType.CAMERA);
  //       }
  //     },
  //     {
  //       text: 'Cancel',
  //       role: 'cancel'
  //     }
  //     ]
  //   });
  //   await actionSheet.present();
  // }


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
