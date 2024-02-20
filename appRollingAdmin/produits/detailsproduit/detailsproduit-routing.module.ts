import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsproduitPage } from './detailsproduit.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsproduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsproduitPageRoutingModule {}
