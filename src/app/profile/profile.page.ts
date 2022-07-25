/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { UserService } from 'src/app/api-services/user.service';
import { GlobalService } from 'src/app/services/global.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Camera, CameraDirection, CameraOptions, CameraResultType, CameraSource} from '@capacitor/camera';
import { async, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/compat/app';
import  'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit{
  [x: string]: any;

  currentUser: any;
  allInfo: any;
  imageElement: any;
  camera: any;
  ref: any;
  task: any;
  logedInInfo: any[] = [];
  photoAddStatus: boolean;
  public photo: string | null;
  subscriptions: Subscription[] = [];
  actionTypeSource = new BehaviorSubject(this.action);

  public profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
  });

  constructor(
    private actionSheetController: ActionSheetController,
    private userService: UserService,
    private globalService: GlobalService,
    private navigationService: NavigationService,
    private angularFireStorage: AngularFireStorage,
    private db: AngularFirestore,
    private fb: FormBuilder,
  ) {
    this.checkAuth();
  }

  ngOnInit(): void {
    if(this.currentUser){
      this.profileForm = this.fb.group({
        name : [ this.currentUser ? this.currentUser.name : '',Validators.required],
        email : [this.currentUser ? this.currentUser.email : '',Validators.required],
        address : [this.currentUser ? this.currentUser.address : '',Validators.required],
        phone : [this.currentUser ? this.currentUser.phone : '',Validators.required],
      });
    }
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
      console.log('(((((((+++++++++++++++++++))))))))))', this.currentUser.id);
      this.uploadpercentage = 0.5;
      this.userService.uploadFile(profilePhoto.base64String, docId).then(data => {
        this.userProfilePhoto = data.downloadURLs;
        this.uploadpercentage = data.percentages;
        this.responseMsg = 'Profile photo changed successfully.';
        this.globalService.showToastMessage(this.responseMsg);
        setTimeout(() => {
          this.loading = false;
          this.uploadpercentage = null;

        }, 3000);
      }, error => {
        console.log('error', error);
        this.loading = false;
        this.uploadpercentage = null;
        this.responseMsg = 'There are some error to profile photo changed.';
        this.globalService.showToastMessage(this.responseMsg);
        console.log('ERROR -> ' + JSON.stringify(error));
      });
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


  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Please Select Option',
      mode: 'ios',
      buttons: [{
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          this.takePicture('gallery');
        }
      },
      // {
      //   text: 'Use Camera',
      //   handler: () => {
      //   }
      // },
      {
        text: 'Cancel',
        icon: 'close',
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

  checkAuth() {
    firebase.default.auth().onAuthStateChanged(user => {
      if (user) {
        this.userService.setCurrentuserData(user.uid).subscribe(logedInInfo => {
          // console.log('((((((((@@@@@)))))))',logedInInfo);
          this.currentUser= logedInInfo;
          console.log('((((((((&&&&&&&&&&&&&&&&&&&&&&&&&)))))))', this.currentUser);
        });
      }
    });
  }
}
