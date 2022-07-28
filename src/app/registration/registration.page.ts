import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavigationService } from '../services/navigation.service';
import { UserService } from '../api-services/user.service';
import { GlobalService } from '../services/global.service';
import { VerifiPhoneNumberComponent } from '../shared-ui-component/verifi-phone-number/verifi-phone-number.component';
import { ModalController} from '@ionic/angular';
import country from './files/CountryCodes.json';
import city from './files/city.json';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage{
  // eslint-disable-next-line @typescript-eslint/quotes
  pwdIcon = "eye-outline";
  showPwd = false;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public errorMsg: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/member-ordering
  public model = { phone_number: '' };
  public register = { phoneNumber: '' };
  public countryCodeData = 'in';
  public showPhoneLoading = false;
  public checkPhoneErrMsg: string | null = null;
  public checkPhoneStatus = false;
  public submitted = false;
  selectedLanguage = 'en';
  citys: any = city;

  signUpForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;
  alert=false;
  showPassword = false;
  


  // eslint-disable-next-line @typescript-eslint/naming-convention
  validation_messages = {
    name: [
      { type: 'required', message: 'Name is required.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ],
    phone: [
      { type: 'required', message: 'Number is required.' },
      { type: 'minlength', message: 'Number must be at least 10 characters long.' },
      // { type: 'maxlength', message: 'Number must be 12 characters long.' }
    ],
    address: [
    { type: 'required', message: 'address is required.' },
    ],
    city: [
    { type: 'required', message: 'city is required.' },
    ],
    state: [
    { type: 'required', message: 'state is required.' },
    ],
  };
  private subscriptions: Subscription[] = [];
  userObj: any;
  products: any = [];

   user = [
    {
      "statusCode":200,
      "body":"9236166",
      "headers":{
         "cache-control":"private",
         "content-type":"text/html",
         "server":"Microsoft-IIS/8.5",
         "set-cookie":[
            "ASPSESSIONIDQWQQASBR=OKNFPKOACBGADALICJHKDELN; secure; path=/"
         ],
         "x-powered-by":"ASP.NET",
         "date":"Thu, 28 Jul 2022 09:42:39 GMT",
         "connection":"close",
         "content-length":"7"
      },
      "request":{
         "uri":{
            "protocol":"https:",
            "slashes":true,
            "auth":null,
            "host":"sms.tivre.com",
            "port":443,
            "hostname":"sms.tivre.com",
            "hash":null,
            "search":"?userid=otp@propyoda.com&password=PropYod@!23&msg=%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20Verification%20Link%20Sms%0A%20%20%20%20%20%20%20%20&mobnum=00917987934995&frommobilenoGSM=PRPYDA&TivreID=1",
            "query":"userid=otp@propyoda.com&password=PropYod@!23&msg=%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20Verification%20Link%20Sms%0A%20%20%20%20%20%20%20%20&mobnum=00917987934995&frommobilenoGSM=PRPYDA&TivreID=1",
            "pathname":"/httppush/send_smsSch.asp",
            "path":"/httppush/send_smsSch.asp?userid=otp@propyoda.com&password=PropYod@!23&msg=%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20Verification%20Link%20Sms%0A%20%20%20%20%20%20%20%20&mobnum=00917987934995&frommobilenoGSM=PRPYDA&TivreID=1",
            "href":"https://sms.tivre.com/httppush/send_smsSch.asp?userid=otp@propyoda.com&password=PropYod@!23&msg=%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20Verification%20Link%20Sms%0A%20%20%20%20%20%20%20%20&mobnum=00917987934995&frommobilenoGSM=PRPYDA&TivreID=1"
         },
         "method":"GET",
         "headers":{
         }
      }
   }
  ]
  newOobj: any = [];

  constructor(
    private routerService: NavigationService,
    private authService: UserService,
    public globalService: GlobalService,
  ) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([Validators.minLength(6),Validators.required
      ])),
      phone: new FormControl('', Validators.compose([Validators.minLength(10),Validators.maxLength(12),Validators.required
      ])),
      address: new FormControl('', Validators.compose([Validators.required])),
      city: new FormControl('', Validators.compose([Validators.required])),
      state: new FormControl('', Validators.compose([Validators.required])),
    });
   
    
  }

  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? 'eye-off-outline' : 'eye-outline';
  }



  public signUpWithEmail(): void {
    console.log(this.signUpForm.value);
    this.signUpForm.value.phoneNumber = this.register.phoneNumber;
    this.signUpForm.value.language = this.selectedLanguage;
    this.subscriptions.push(
      this.authService.registerUser(this.signUpForm.value).subscribe(res => {
        console.log('^^^^^^$$$$$$$$^^^^^', res);
        if (res.status === 200) {
          this.globalService.hideLoading();

        } else {
          this.globalService.hideLoading();
          this.errorMsg = res.message;
        }
      }, error => {
        this.globalService.hideLoading();
        console.error(error);
      })
    );
  }

  public sendData(): void {
    this.user;
    console.log(this.user);
    // this.authService.sendData(this.user)
    this.newOobj = Object.setPrototypeOf(this.user, Object.prototype); 
    console.log(this.newOobj);
     this.authService.sendData(this.newOobj);
  }





  // eslint-disable-next-line @typescript-eslint/member-ordering
  redirectLoggedUserToProfilePage() {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public navigateTo(url: string): void{
    this.routerService.navigateTo(url);
  }



}
