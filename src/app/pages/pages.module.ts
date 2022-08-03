import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesPageRoutingModule } from './pages-routing.module';

import { PagesPage } from './pages.page';
import { PostUploadComponent } from './post-upload/post-upload.component';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PagesPageRoutingModule,
  ],
  declarations: [
    PagesPage,
    PostUploadComponent,
    MessageComponent,
    ChatComponent
  ]
})
export class PagesPageModule {}
