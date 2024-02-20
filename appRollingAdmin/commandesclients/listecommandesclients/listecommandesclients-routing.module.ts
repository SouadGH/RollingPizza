import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListecommandesclientsPage } from './listecommandesclients.page';

const routes: Routes = [
  {
    path: '',
    component: ListecommandesclientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListecommandesclientsPageRoutingModule {}
