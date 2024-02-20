import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailcommandePage } from './detailcommande.page';

const routes: Routes = [
  {
    path: '',
    component: DetailcommandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailcommandePageRoutingModule {}
