import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypelivraisonPage } from './typelivraison.page';

const routes: Routes = [
  {
    path: '',
    component: TypelivraisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypelivraisonPageRoutingModule {}
