import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavigationService } from '../services/navigation.service';
import { NotificationService } from '../services/notification.service';
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
  loading = false;

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

   user = "Mobile No|MsgId|TIVRE ID|Send Date|Delivery Date|Status#00917987934995|0|9237530|7/28/2022 7:25:00 PM|7/28/2022 7:25:00 PM|delivrd #"
  newOobj: any = [];
  ler: string;
  newOoobj: any;
  newArr: void;
  str1: string;
  str2: string;
  newCo: { date: Date; }[];

  constructor(
    private routerService: NavigationService,
    private authService: UserService,
    public globalService: GlobalService,
    private notification: NotificationService
  ) {
    const obj = {
      date : new Date()
    }
    console.log(obj)
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

  public newObj(){
    console.log(this.user);
    var obj1 = this.user.split("#")
    console.log(obj1);


    this.str1 = obj1[0].toString();
    console.log(this.str1)

    var obj2 = this.str1.split("|")
    console.log(obj2)/////////////

    this.str2 = obj1[1].toString();
    console.log(this.str2)

    var obj3 = this.str2.split("|")
    console.log(obj3)////////
    
    
    
    const obj = {};
     obj2.forEach((element, index) => {
      obj[element] = obj3[index];
    });
    console.log('*********',obj)
    const date = {
      date : new Date()
    }
    console.log(date)

    Object.keys(obj).forEach(key => obj["Send Date"] = date )
    console.log('((((())))', obj)

    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);

    var seq = (Math.floor(Math.random() * 40000) + 50000).toString().substring(1);
    console.log(seq);


  }


  public signUpWithEmail(): void {
    console.log(this.signUpForm.value);
    this.loading = true;
    this.authService.checkEmail(this.signUpForm.value.emai);
    this.signUpForm.value.phoneNumber = this.register.phoneNumber;
    this.signUpForm.value.language = this.selectedLanguage;
    this.subscriptions.push(
      this.authService.registerUser(this.signUpForm.value).subscribe(res => {
        // console.log('^^^^^^$$$$$$$$^^^^^', res);
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
