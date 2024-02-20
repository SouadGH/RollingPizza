import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchivesCommandesPage } from './archives-commandes.page';

const routes: Routes = [
  {
    path: '',
    component: ArchivesCommandesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchivesCommandesPageRoutingModule {}
