import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeproduitPage } from './listeproduit.page';

const routes: Routes = [
  {
    path: '',
    component: ListeproduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeproduitPageRoutingModule {}
