import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifieremployerPageRoutingModule } from './modifieremployer-routing.module';

import { ModifieremployerPage } from './modifieremployer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifieremployerPageRoutingModule
  ],
  declarations: [ModifieremployerPage]
})
export class ModifieremployerPageModule {}
