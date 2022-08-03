import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/api-services/user.service';
import { ActionSheetController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { Camera, CameraDirection, CameraOptions, CameraResultType, CameraSource} from '@capacitor/camera';
import * as firebase from 'firebase/compat/app';
import 'firebase/auth'

@Component({
  selector: 'app-post-upload',
  templateUrl: './post-upload.component.html',
  styleUrls: ['./post-upload.component.scss'],
})
export class PostUploadComponent implements OnInit {
 public currentUser: any;
  profileImage: any;
  userProfilePhoto: any;
  responseMsg: string;
  loading = false

  constructor(
    private routerService: NavigationService,
    private userService: UserService,
    private globalService: GlobalService,
    private actionSheetController: ActionSheetController
  ) { 
    this.checkAuth();
  }

  ngOnInit() {}


  public navigateTo(url: string): void {
    this.routerService.navigateTo(url);
  }
  public backTo(): void {
    this.routerService.backTo();
  }

  //==================================POST UPLOAD=====================================//

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Please Select Option',
      mode: 'ios',
      buttons: [{
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          console.log('Click Gallery');
          this.takePicture('gallery');
        }
      },
      {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          console.log('Click Camera');
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

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
      const docId = this.currentUser.id;
      console.log('((((((=======))))))', profilePhoto)
      this.globalService.showLoading(true);
      return;
      this.userService.uploadFile(profilePhoto.base64String, docId).then(data => {
        this.userProfilePhoto = data.downloadURLs;
        this.responseMsg = 'Profile photo changed successfully.';
        this.globalService.showToastMessage(this.responseMsg);
        this.globalService.hideLoading();

      }, error => {
        console.log('error', error);
        this.loading = false;
        this.responseMsg = 'There are some error to profile photo changed.';
        this.globalService.showToastMessage(this.responseMsg);
        console.log('ERROR -> ' + JSON.stringify(error));
      });
    });
  };

  //==================================POST UPLOAD END=====================================//



  checkAuth() {
    firebase.default.auth().onAuthStateChanged(user => {
      if (user) {
        this.userService.setCurrentuserData(user.uid).subscribe(logedInInfo => {
          console.log('((((((((@@@@@)))))))',logedInInfo);
          this.currentUser = logedInInfo;
          this.profileImage = (!this.currentUser.photo || this.currentUser.photo === '') ? '../../assets/avatar.png' : this.currentUser.photo ;
          // this.profileImage = this.currentUser.photo;
        }); 
      }
    });
  }

}
