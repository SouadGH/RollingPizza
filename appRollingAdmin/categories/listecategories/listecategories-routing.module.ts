import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListecategoriesPage } from './listecategories.page';

const routes: Routes = [
  {
    path: '',
    component: ListecategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListecategoriesPageRoutingModule {}
