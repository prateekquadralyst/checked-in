import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { VerifiPhoneNumberComponent } from './verifi-phone-number/verifi-phone-number.component';



// const SHARED_COMPONENTS = [
//   RewardsComponent,
//   SocialMediaComponent,
//   LoginWithFacebookComponent,
//   LoginWithGoogleComponent,
//   HeaderComponent,
//   TicketsComponent,
//   PlayersComponent,
//   WinnersComponent,
//   TicketNumbersComponent,
// ];
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
  ],
  // exports: SHARED_COMPONENTS,
  // entryComponents: [
  //   AddRewardComponent,
  //   IssueTicketsComponent,
  //   TicketExpandComponent,
  //   EditProfileComponent,
  //   RewardWinnerDetailComponent,
  //   OrgGameInfoComponent,
  //   VerifiPhoneNumberComponent,
  //   AppStarRateComponent,
  //   AppRateComponent

  // ],
  providers: [],
})
export class SharedUiComponentModule { }
