import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeingredientsPageRoutingModule } from './listeingredients-routing.module';

import { ListeingredientsPage } from './listeingredients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeingredientsPageRoutingModule
  ],
  declarations: [ListeingredientsPage]
})
export class ListeingredientsPageModule {}
