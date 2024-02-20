import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouteringredientPageRoutingModule } from './ajouteringredient-routing.module';

import { AjouteringredientPage } from './ajouteringredient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouteringredientPageRoutingModule
  ],
  declarations: [AjouteringredientPage]
})
export class AjouteringredientPageModule {}
