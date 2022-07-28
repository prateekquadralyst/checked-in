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
import cityjson from './files/city.json';
import { UserData } from 'src/providers/user-data';

interface CITY {
  id: number;
  name: string;
  state: string;
};

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
  actionTypeSource = new BehaviorSubject(this.action);
  citys: any= cityjson;
  private subscriptions: Subscription[] = [];


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
    let userObj = {
      name: "Sammy",
      email: "sammy@example.com",
      plan: "Pro"
    };
  
let userStr = JSON.stringify(userObj);

console.log(userStr);
    
  }

  ngOnInit(): void {

      // this.profileForm = this.fb.group({
      //   address : [ this.currentUser ? this.currentUser.address : '',Validators.required],
      //   city : [this.currentUser ? this.currentUser.city : '',Validators.required],
      //   state : [this.currentUser ? this.currentUser.state : '',Validators.required],
      //   userType : [this.currentUser ? this.currentUser.userType : '',Validators.required],
      // });

  }

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
      console.log('(((((((+++++++++++++++++++))))))))))', this.currentUser.id);
      this.globalService.showLoading(true);
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


  async logout(): Promise<void>{
    // alert('+====================');
    await this.userService.logout();
    this.globalService.showLoading(true);
    setTimeout(() => {
      this.globalService.hideLoading();
    }, 1500);
    if(this.logout){
      this.navigationService.navigateTo('login');
      console.log('Logout Successfull');
    } else {
      console.log('Logout unsuccessfull*************');
    }
  }

  checkAuth() {
    this.globalService.showLoading(true);
    firebase.default.auth().onAuthStateChanged(user => {
      if (user) {
        this.userService.setCurrentuserData(user.uid).subscribe(logedInInfo => {
          // console.log('((((((((@@@@@)))))))',logedInInfo);
          this.currentUser= logedInInfo;
          this.profileImage = this.currentUser.photo !== '' ? this.currentUser.photo : '../../assets/avatar.png';
          this.globalService.hideLoading();
          // console.log('((((((((&&&&&&&&&&&&&&&&&&&&&&&&&)))))))', this.currentUser);
        });
      }
    });
  }

  public update(){
    console.log('==========@@@@@@@=========',this.profileForm.value);
  }
}

