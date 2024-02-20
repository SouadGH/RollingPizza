import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjoutercategoriePage } from './ajoutercategorie.page';

const routes: Routes = [
  {
    path: '',
    component: AjoutercategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjoutercategoriePageRoutingModule {}
