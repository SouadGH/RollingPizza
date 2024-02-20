import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsclientPage } from './detailsclient.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsclientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsclientPageRoutingModule {}
