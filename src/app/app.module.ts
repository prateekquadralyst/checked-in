import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NativePageTransitions} from '@ionic-native/native-page-transitions/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { IonicModule} from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedUiComponentModule } from './shared-ui-component/shared-ui-component.module';
import { HeaderDirective } from './header.directive';

@NgModule({
  declarations: [AppComponent, HeaderDirective],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    SharedUiComponentModule
  ],
  providers: [
    NativePageTransitions,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
