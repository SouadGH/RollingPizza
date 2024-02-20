import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifiercategoriePage } from './modifiercategorie.page';

const routes: Routes = [
  {
    path: '',
    component: ModifiercategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifiercategoriePageRoutingModule {}
