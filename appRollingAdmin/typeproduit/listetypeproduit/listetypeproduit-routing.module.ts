import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListetypeproduitPage } from './listetypeproduit.page';

const routes: Routes = [
  {
    path: '',
    component: ListetypeproduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListetypeproduitPageRoutingModule {}
