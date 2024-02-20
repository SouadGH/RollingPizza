import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeproduitPageRoutingModule } from './listeproduit-routing.module';

import { ListeproduitPage } from './listeproduit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeproduitPageRoutingModule
  ],
  declarations: [ListeproduitPage]
})
export class ListeproduitPageModule {}
