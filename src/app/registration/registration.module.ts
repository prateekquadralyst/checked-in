import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiComponentModule} from '../shared-ui-component/shared-ui-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    ReactiveFormsModule,
    SharedUiComponentModule,

  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule {}
