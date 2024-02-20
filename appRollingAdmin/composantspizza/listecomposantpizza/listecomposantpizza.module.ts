import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListecomposantpizzaPageRoutingModule } from './listecomposantpizza-routing.module';

import { ListecomposantpizzaPage } from './listecomposantpizza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListecomposantpizzaPageRoutingModule
  ],
  declarations: [ListecomposantpizzaPage]
})
export class ListecomposantpizzaPageModule {}
