import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

const routes: Routes = [
  {
    path: 'tablinks',
    component: TablinksPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../registration/registration.module').then(m => m.RegistrationPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../timeline/timeline.module').then(m => m.TimelinePageModule)
      },
      {
        path: '',
        redirectTo: '/tablinks/profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tablinks/profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule {}
