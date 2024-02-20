import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListetypeproduitPageRoutingModule } from './listetypeproduit-routing.module';

import { ListetypeproduitPage } from './listetypeproduit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListetypeproduitPageRoutingModule
  ],
  declarations: [ListetypeproduitPage]
})
export class ListetypeproduitPageModule {}
