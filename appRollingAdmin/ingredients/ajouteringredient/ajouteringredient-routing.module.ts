import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouteringredientPage } from './ajouteringredient.page';

const routes: Routes = [
  {
    path: '',
    component: AjouteringredientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouteringredientPageRoutingModule {}
