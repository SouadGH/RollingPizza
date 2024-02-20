import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifieringredientPage } from './modifieringredient.page';

const routes: Routes = [
  {
    path: '',
    component: ModifieringredientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifieringredientPageRoutingModule {}
