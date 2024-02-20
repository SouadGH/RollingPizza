import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterproduitPage } from './ajouterproduit.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterproduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterproduitPageRoutingModule {}
