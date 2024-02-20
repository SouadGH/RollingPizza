import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeemployesPage } from './listeemployes.page';

const routes: Routes = [
  {
    path: '',
    component: ListeemployesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeemployesPageRoutingModule {}
