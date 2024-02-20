import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutertypeproduitPageRoutingModule } from './ajoutertypeproduit-routing.module';

import { AjoutertypeproduitPage } from './ajoutertypeproduit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutertypeproduitPageRoutingModule
  ],
  declarations: [AjoutertypeproduitPage]
})
export class AjoutertypeproduitPageModule {}
