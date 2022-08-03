import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/api-services/user.service';
import { ActionSheetController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import * as _ from 'lodash';
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
  public imageError: string | null = null;
  public imageLoading = false;
  public selectedPhoto = '';
  public isImageSaved: boolean;

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



  public selectImages(fileInput: any) {
    this.imageLoading = true;
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      const maxSize = 20971520;
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpeg'];
      const maxHeight = 15200;
      const maxWidth = 25600;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgHeight = rs.currentTarget['height'];
          const imgWidth = rs.currentTarget['width'];


          if (imgWidth > maxHeight && imgWidth > maxWidth) {
            this.imageError =
              'Maximum dimentions allowed ' +
              imgHeight +
              '*' +
              maxWidth +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.selectedPhoto = imgBase64Path;
            this.imageLoading = false;
            this.isImageSaved = true;
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  

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
