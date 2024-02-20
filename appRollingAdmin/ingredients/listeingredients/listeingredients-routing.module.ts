import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeingredientsPage } from './listeingredients.page';

const routes: Routes = [
  {
    path: '',
    component: ListeingredientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeingredientsPageRoutingModule {}
