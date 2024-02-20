import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjoutertypeproduitPage } from './ajoutertypeproduit.page';

const routes: Routes = [
  {
    path: '',
    component: AjoutertypeproduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjoutertypeproduitPageRoutingModule {}
