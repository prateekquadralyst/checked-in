import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from 'src/app/api-services/user.service';
import { GlobalService } from 'src/app/services/global.service';
// import { SendSmsService } from 'src/app/api-services/send-sms.service';
import { ModalController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { SendSmsService } from 'src/app/api-services/send-sms.service';

@Component({
  selector: 'app-verifi-phone-number',
  templateUrl: './verifi-phone-number.component.html',
  styleUrls: ['./verifi-phone-number.component.scss'],
})
export class VerifiPhoneNumberComponent implements OnInit {

  person = { phoneNumber: '' };
  countryCodeData: string;
  stapOne = true;
  smsCodeValue: number;
  currentUser: any;
  checkPhoneErrMsg: string;
  subscriptions: Subscription[] = [];
  alradyPhoneStatus = false;
  otp: number;
  otpNotMatch: string;

  constructor(
    private userService: UserService,
    public globalService: GlobalService,
    // public sendSmsService: SendSmsService,
    private modalCtr: ModalController,
    private router: Router,
    private routerService: NavigationService,
    private sendSmsService: SendSmsService
  ) { }

  ngOnInit() {
    this.person = { phoneNumber: this.currentUser.phone };
  }

  back() {
    this.stapOne = true;
  }

  sendOtp() {
    this.stapOne = false;
    this.otp = Math.floor(1000 + Math.random() * 9000);
    // console.log(this.otp);
    const msg = `Your One time Password is ${this.otp}`;
    this.sendSmsService.sendMessage(this.person.phoneNumber, msg);
    // this.subscriptions.push(
    //   this.sendSmsService.sendMessage('msg', this.person.phoneNumber, msg).subscribe(res => {
    //     console.log('res', res);
    //   })
    // );
  }

  verify() {
    if (Number(this.otp) === Number(this.smsCodeValue) ) {
      this.otpNotMatch = '';
      const obj = {
        phone: this.person.phoneNumber,
        verifyPhoneNumber : true
      };
      this.userService.updateUser(this.currentUser.id, obj).subscribe(res => {
        // console.log('res 122', res);
        // console.log('res', res);
        console.log('71 Run subscribe',res);
        if (res.status === 200) {
          this.stapOne = false;
          this.close();
          // this.routerService.navigateTo('home/select-game');
        }
      });
    } else {
      this.otpNotMatch = 'OPT not match';
    }
  }


  close() {
    this.modalCtr.dismiss();
    setTimeout(() => {
      this.modalCtr.dismiss();
    }, 500);
  }

}
