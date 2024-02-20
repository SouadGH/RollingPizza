import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifiertypeproduitPageRoutingModule } from './modifiertypeproduit-routing.module';

import { ModifiertypeproduitPage } from './modifiertypeproduit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifiertypeproduitPageRoutingModule
  ],
  declarations: [ModifiertypeproduitPage]
})
export class ModifiertypeproduitPageModule {}
