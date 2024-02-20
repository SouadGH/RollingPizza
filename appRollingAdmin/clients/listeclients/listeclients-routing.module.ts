import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeclientsPage } from './listeclients.page';

const routes: Routes = [
  {
    path: '',
    component: ListeclientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeclientsPageRoutingModule {}
