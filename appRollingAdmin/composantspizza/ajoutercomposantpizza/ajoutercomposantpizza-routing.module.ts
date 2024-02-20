import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjoutercomposantpizzaPage } from './ajoutercomposantpizza.page';

const routes: Routes = [
  {
    path: '',
    component: AjoutercomposantpizzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjoutercomposantpizzaPageRoutingModule {}
