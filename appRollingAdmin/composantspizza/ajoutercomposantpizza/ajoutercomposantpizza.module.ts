import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutercomposantpizzaPageRoutingModule } from './ajoutercomposantpizza-routing.module';

import { AjoutercomposantpizzaPage } from './ajoutercomposantpizza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutercomposantpizzaPageRoutingModule
  ],
  declarations: [AjoutercomposantpizzaPage]
})
export class AjoutercomposantpizzaPageModule {}
