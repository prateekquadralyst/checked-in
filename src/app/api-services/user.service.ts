/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-underscore-dangle */
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Subject, of, Subscription, BehaviorSubject } from 'rxjs';
import { NavigationService } from '../services/navigation.service';
import { finalize } from 'rxjs/operators';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/compat/app';
import  'firebase/auth';

export interface UserPro{
  id: any;
  username: string;
  uid: string;
}

export interface User {

  id: string;
  name: string;
  email: string;
  phone: string;
  dateCreated: Date;
  emailVerified: string;
  mobileVerified: string;
  createdAt: string;
  createdBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any = null;
  signUpDaTa: any;
  userProviderAdditionalInfo: any;
  redirectResult: Subject<any> = new Subject<any>();
  userSubscriptions: Subscription;
  userCollection: any;
  testing: any;
  response: { status: number; message: string; data: any};
  action: string | null = null;
  actionTypeSource = new BehaviorSubject(this.action);
  currentUserDataSource = new BehaviorSubject(this.currentUser);
  currentUserInfo = this.currentUserDataSource.asObservable();
  private user: UserPro;
  private authenticationStatusSubject = new Subject<Observable<any>>();
  private tableName: string | null = null;
  data: any;

  // const name = new String("Hello World");


  constructor(
    public _afs: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    public _ngZone: NgZone,
    public routerService: NavigationService,
    private storage: AngularFireStorage
    ) {
      // this.checkAuth();
    this.userCollection = this._afs.collection<User>('Users');
    this.testing = this._afs.collection<User>('Test');
    this.wordCounter2();
  }

  wordCounter2(){
    const arr = ['#userType#','#userName#'];
    let msg = 'Hello #userType# #userType#';
      msg = msg.replace(/#userType#/g, 'abcdefghijklmnopqrstuvwxy');
    console.log(msg.length);

  }

  checkAuth() {
    firebase.default.auth().onAuthStateChanged(user => {
      if (user) {
        this.setCurrentuserData(user.uid).subscribe(logedInInfo => {
          console.log('((((((((@@@@@)))))))',logedInInfo);
          this.currentUser = logedInInfo;
        });
      }
    });
  }

  setProviderAdditionalInfo(additionalInfo: any) {
    this.userProviderAdditionalInfo = {...additionalInfo};
  }

  public updateUser(id, data): Observable<any> {
    const obs = new Observable((observer) => {
      this._afs.collection('Users').doc(id).update(data).then(() => {
        observer.next({
          message: 'User updated successfuly.',
          status: 200,
        });
      }, error => {
        observer.next({
          message: error.Error,
          status: 500,
        });
      });
    });
    return obs;
  }

  public checkPhone(phoneNumber: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this._afs.collection('Users', ref => ref.where('phone', '==', phoneNumber)).snapshotChanges()
      .pipe(
        map((actions) => actions.map((doc: any) => {
            const data = doc.payload.doc.data();
            const id = doc.payload.doc.id;
            // eslint-disable-next-line @typescript-eslint/ban-types
            return { id, ...data as {} };
          }))
      );
  }

  public checkEmail(email: string): Observable<any> {
    const obj = new Observable((observer) => {
      firebase.default.auth().fetchSignInMethodsForEmail(email).then(data => {
        observer.next({
          message: data,
          status: 200,
        });
      }, error => {
        observer.next({
          message: error,
          status: 500,
        });
      });
    });
    return obj;
  }

  public setCurrentuserData(uId): Observable<any> {
    const userData = this._afs.collection<any[]>('Users', ref => ref.where('id', '==', uId));
    return userData.snapshotChanges()
    .pipe(
      map(changes => changes.map((doc: any) => {
        const data = doc.payload.doc.data();
        const id = doc.payload.doc.id;
        // console.log(data);
          // eslint-disable-next-line @typescript-eslint/ban-types
          return { id, ...data as {} };
        })),
        map((user) => user.find(doc => doc.id === uId)));
  }

  public registerUser(value): Observable<any> {
    this.signUpDaTa = value;
    this.signUpDaTa.loginType = 'simpleLogin';
    this.signUpDaTa.socialType = 'simple';

    const obj = new Observable((observer) => {

      firebase.default.auth().createUserWithEmailAndPassword(value.email, value.password).then((data) => {

        firebase.default.auth().setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
          .then(() => {
            console.log('Persistance is working');
          })
          .catch((error) => {
            observer.next({
              message: error.message,
              status: 500,
            });
          });

        this.currentUser = data;
        this.addUser(this.signUpDaTa, this.currentUser);
        this.userSubscriptions = this.setCurrentuserData(this.currentUser.user.uid).subscribe(logedInInfo => {
          console.log('============%%%%%%%%===========', logedInInfo);
          this.currentUserDataSource.next(logedInInfo);
        });

      }, error => {
        console.log('error register', error);
        observer.next({
          message: error.message,
          status: 500,
        });
      });
    });
    return obj;
  }

  public sendData(value){
    this.data = value;
    this.testing.doc().set(value).then(async () =>{
      this.response = {
        status: 200,
        message: 'successfuly.',
        data: null
      };
    })
    return of(this.response);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public addUser(UserData, currentUser): Observable<any> {
    this.signUpDaTa = UserData;
    this.currentUser = currentUser;
    const userData: any = {
      id: this.currentUser.user.uid,
      name: this.signUpDaTa.name[0].toUpperCase() + this.signUpDaTa.name.substr(1).toLowerCase(),
      email: this.currentUser.user.email,
      address: this.signUpDaTa.address,
      city: this.signUpDaTa.city,
      state: this.signUpDaTa.state,
      dateCreated: this.currentUser.user.metadata.creationTime,
      newDateCreated: new Date(),
      emailVerified: this.currentUser.user.emailVerified,
      mobileVerified: '',
      phone: this.signUpDaTa.phone,
      loginType: UserData.loginType,
      socialType: UserData.socialType,
      language: UserData.language,
      createdAt: 'Indore',
      createdBy: 'Prateek Shukla',
      photo: '',
      verifyPhoneNumber: false,
      };

    this.userCollection.doc(this.currentUser.user.uid).set(userData).then(async () => {

      this.response = {
        status: 200,
        message: 'Account created successfuly.',
        data: null
      };
      this.routerService.navigateTo('login');
    }).catch((error) => error.message);

    return of(this.response);
  }

  //================================LOGIN=========================================//

  public loginUser(value): Observable<any> {
    console.log('this.currentUser', this.currentUser);
    const obj = new Observable((observer) => {
      firebase.default.auth().setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase.default.auth().signInWithEmailAndPassword(value.email, value.password).then(data => {
            this.userSubscriptions = this.setCurrentuserData(data.user.uid).subscribe(async logedInInfo => {
              console.log('==========420=======', logedInInfo);
              this.currentUserDataSource.next(logedInInfo);
            });
            if (data) {
              observer.next({
                message: data,
                status: 200,
              });
            }
          }, error => {
            observer.next({
              message: error,
              status: 500,
            });
          });
        })
        .catch((error) => {
          observer.next({
            message: error.message,
            status: 500,
          });
        });
    });
    return obj;
  }

  getCurrentUser(): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      this.angularFireAuth.onAuthStateChanged(returnedUser => {
        if (returnedUser) {
          resolve(returnedUser.uid);
          this._afs.collection("Users").doc(returnedUser.uid).valueChanges();
        } else {
          reject(null);
        }
      });
    });
    return promise;
  }

  logout(){
    this.currentUser= null;
    this.currentUserDataSource.next(this.currentUser);
    this.actionTypeSource.next('logout');
    firebase.default.auth().signOut();
    this.routerService.navigateTo('login');
  }

  //=====================================uploading======================================//

  async uploadFile(profilePhoto: string, id: string){
    const user = firebase.default.auth().currentUser;
    // console.log('-----------user----------', user);

    const selfieRef = await firebase.default.storage().ref(`profilePhotos/${user.uid}/profilePhoto.jpeg`);
    // console.log('=======selfieRef=========', selfieRef);

    return selfieRef.putString(profilePhoto, 'base64', { contentType: 'image/jpeg' }).then(async savedProfilePhoto => {
      // console.log('=======savedProfilePhoto=========', savedProfilePhoto);

      const percentage = (savedProfilePhoto.bytesTransferred / savedProfilePhoto.totalBytes) * 100;
      return savedProfilePhoto.task.snapshot.ref.getDownloadURL().then(async downloadURL =>
         this._afs.collection('Users').doc(id)
          .update({ photo: downloadURL }).then(() => {
            const data = {
              downloadURLs: downloadURL,
              percentages: percentage
            };
            return data;
          }, error => error.message)
      );
    });
  }
  public updateUserPhoto(user: any, downloadURL: any){
    const updateData =  {
      photo : downloadURL
    };
    this._afs.collection('Users').doc(user.id).update(updateData).then();
  }

}

