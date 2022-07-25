import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { VerifiPhoneNumberComponent } from './verifi-phone-number/verifi-phone-number.component';
import { MenuComponent} from './menu/menu.component';



const SHARED_COMPONENTS = [
  MenuComponent
];
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    VerifiPhoneNumberComponent,
    SHARED_COMPONENTS
  ],
  exports: SHARED_COMPONENTS,
  providers: [],
})
export class SharedUiComponentModule { }
