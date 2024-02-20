import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListecategoriesPageRoutingModule } from './listecategories-routing.module';

import { ListecategoriesPage } from './listecategories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListecategoriesPageRoutingModule
  ],
  declarations: [ListecategoriesPage]
})
export class ListecategoriesPageModule {}
