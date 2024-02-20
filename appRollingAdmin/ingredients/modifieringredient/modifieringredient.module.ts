import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifieringredientPageRoutingModule } from './modifieringredient-routing.module';

import { ModifieringredientPage } from './modifieringredient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifieringredientPageRoutingModule
  ],
  declarations: [ModifieringredientPage]
})
export class ModifieringredientPageModule {}
