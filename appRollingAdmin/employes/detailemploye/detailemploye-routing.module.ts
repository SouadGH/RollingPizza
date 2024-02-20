import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailemployePage } from './detailemploye.page';

const routes: Routes = [
  {
    path: '',
    component: DetailemployePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailemployePageRoutingModule {}
