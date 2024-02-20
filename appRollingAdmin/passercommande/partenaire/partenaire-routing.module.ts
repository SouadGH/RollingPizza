import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartenairePage } from './partenaire.page';

const routes: Routes = [
  {
    path: '',
    component: PartenairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartenairePageRoutingModule {}
