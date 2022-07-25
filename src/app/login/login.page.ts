import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';

import { RegistrationPage } from '../registration/registration.page';
import { NavigationService } from '../services/navigation.service';
import { UserService } from '../api-services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs-compat/operator/filter';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  pwdIcon = 'eye-outline';
  showPwd = false;
  onLoginForm: FormGroup;
  errorMsg: any;
  submitted = false;
  subscriptions: any;
  userService: any;
  loginForm: any;
  ref: any;
  private subscripations: Subscription[] = [];


   // eslint-disable-next-line @typescript-eslint/member-ordering, @typescript-eslint/naming-convention
   validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ],
  };

  constructor(
    public fb: FormBuilder,
    private routerService: NavigationService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private authService: UserService,
    private router: Router,
    public globalService: GlobalService
  ) {
    this.onLoginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });

  }
  togglePwd(){
    this.showPwd =! this.showPwd;
    this.pwdIcon = this.showPwd ? 'eye-off-outline' : 'eye-outline';
  }

  public ionViewDidEnter(): void {
    this.errorMsg = '';
  }

  public ionViewDidLeave(): void {
    this.subscripations.map(subscription => {
      subscription.unsubscribe();
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  public login(url: string): void {
    alert('===============');
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&',this.onLoginForm.value);
    this.errorMsg = '';
    this.submitted = true;

    if (this.onLoginForm.value.email !== '' && this.onLoginForm.value.password !== '' ) {
      this.globalService.showLoading(true);
      if (this.onLoginForm.value.email.search('@') !== -1) {
        // console.log('this.loginForm.value', this.loginForm.value);
        this.subscripations.push(
          this.authService.loginUser(this.onLoginForm.value).subscribe(data => {
            this.onLoginForm.reset();
            console.log('((((((88888888))))))))',data);
            this.globalService.hideLoading();
            if (data.status === 200) {
              this.routerService.navigateTo('profile');
            } else {
              // console.log('data.message.code', data.message.code)
              if (data.message.code === 'auth/user-not-found') {
                this.errorMsg = 'This user does not exist. Please create an account';
                this.globalService.showToastMessage(this.errorMsg);
                this.ref.detectChanges();
              } else if (data.message.code === 'auth/wrong-password') {
                this.errorMsg = 'This password is wrong';
                this.globalService.showToastMessage(this.errorMsg);
                this.ref.detectChanges();
              } else {
                this.errorMsg = data.message;
                this.globalService.showToastMessage(this.errorMsg);
                this.ref.detectChanges();
              }

            }
          }, error => {
            this.globalService.hideLoading();
            console.log('There are some error in fetching user Info');
          })
        );

      } else {
        // this.subscriptions.push(
        //   this.userService.checkPhone(this.loginForm.value.email).subscribe(userInfo => {
        //     console.log('#########++++++++########',userInfo);
        //     if (userInfo.length) {
        //       this.loginForm.value.email = userInfo[0].email;
        //       this.subscriptions.push(
        //         this.userService.loginUser(this.loginForm.value).subscribe(data => {
        //           console.log('======7777777=======', data);
        //           if (data.status === 200) {
        //             this.globalService.hideLoading();
        //             this.routerService.navigateTo('timeline');
        //           } else {
        //             this.globalService.hideLoading();
        //             if (data.message.code === 'auth/user-not-found') {
        //               this.errorMsg = 'This user does not exist. Please create an account';
        //               this.ref.detectChanges();
        //             } else if (data.message.code === 'auth/wrong-password') {
        //               this.errorMsg = 'This password is wrong';
        //               this.ref.detectChanges();
        //             } else {
        //               this.errorMsg = data.message;
        //               this.ref.detectChanges();
        //             }
        //           }
        //         }, error => {
        //           console.error('error', error);
        //           this.globalService.hideLoading();
        //           console.log('There are some error in fetching user Info');
        //         })
        //       );
        //     } else {
        //       this.globalService.hideLoading();
        //       this.errorMsg = 'This user does not exist. Please create an account';
        //       this.ref.detectChanges();
        //     }
        //   })
        // );
      }
    } else  {
      this.errorMsg = 'All fields are required';
    }

  }


  public navigateTo(url: string): void{
    this.routerService.navigateTo(url);
  }


}
