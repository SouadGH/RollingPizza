import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsproduitPageRoutingModule } from './detailsproduit-routing.module';

import { DetailsproduitPage } from './detailsproduit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsproduitPageRoutingModule
  ],
  declarations: [DetailsproduitPage]
})
export class DetailsproduitPageModule {}
