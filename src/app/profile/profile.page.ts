import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActionSheetController } from '@ionic/angular';
import { UserService } from 'src/app/api-services/user.service';
import { GlobalService } from 'src/app/services/global.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Camera, CameraDirection, CameraOptions, CameraResultType, CameraSource} from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  imageElement: any;
  camera: any;
  ref: any;
  task: any;
  logedInInfo: any[] = [];
  photoAddStatus: boolean;
  public photo: string | null;

  constructor(
    private actionSheetController: ActionSheetController,
    private userService: UserService,
    private globalService: GlobalService,
    private navigationService: NavigationService,
    private angularFireStorage: AngularFireStorage
  ) { }

    takePicture = async (type: string) => {
      const comeraOptions: CameraOptions = {
        allowEditing: false,
        correctOrientation: true,
        direction: CameraDirection.Front,
        quality: 95,
        resultType: CameraResultType.Base64,
        source: null,
        saveToGallery: true
      };

    if (type === 'camera') {
      comeraOptions.source = CameraSource.Camera;
    } else {
      comeraOptions.source = CameraSource.Photos;
    }

    await Camera.getPhoto(comeraOptions).then(async profilePhoto => {
      this.photoAddStatus = true;
      this.photo = profilePhoto.base64String;
      console.log('(((((((((((+++++++++++))))))))))',this.photo);
    });
  };


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


  async selectImage(event) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Please Select Option',
      mode: 'ios',
      buttons: [{
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          this.takePicture(event);
        }
      },
      // {
      //   text: 'Use Camera',
      //   handler: () => {
      //   }
      // },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
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
