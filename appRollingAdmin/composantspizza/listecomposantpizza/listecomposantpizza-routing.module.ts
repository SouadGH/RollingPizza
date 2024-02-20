import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListecomposantpizzaPage } from './listecomposantpizza.page';

const routes: Routes = [
  {
    path: '',
    component: ListecomposantpizzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListecomposantpizzaPageRoutingModule {}
