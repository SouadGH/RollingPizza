import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmercommandePage } from './confirmercommande.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmercommandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmercommandePageRoutingModule {}
