import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilclientPage } from './profilclient.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilclientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilclientPageRoutingModule {}
