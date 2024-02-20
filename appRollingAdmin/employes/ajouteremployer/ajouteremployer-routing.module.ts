import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouteremployerPage } from './ajouteremployer.page';

const routes: Routes = [
  {
    path: '',
    component: AjouteremployerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouteremployerPageRoutingModule {}
