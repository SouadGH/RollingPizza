import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifiertypeproduitPage } from './modifiertypeproduit.page';

const routes: Routes = [
  {
    path: '',
    component: ModifiertypeproduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifiertypeproduitPageRoutingModule {}
