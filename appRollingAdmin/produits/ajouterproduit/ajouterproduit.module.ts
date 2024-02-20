import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterproduitPageRoutingModule } from './ajouterproduit-routing.module';

import { AjouterproduitPage } from './ajouterproduit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterproduitPageRoutingModule
  ],
  declarations: [AjouterproduitPage]
})
export class AjouterproduitPageModule {}
