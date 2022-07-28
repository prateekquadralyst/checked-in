import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';
import { PostUploadComponent } from './post-upload/post-upload.component';
import { MessageComponent } from './message/message.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    component: PagesPage,
    children : [
      {
        path: 'post-upload',
        component: PostUploadComponent
      },
      {
        path: 'message',
        component: MessageComponent
      },
      {
        path: 'tabs',
        component: TabsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
