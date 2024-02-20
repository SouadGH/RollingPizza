import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypelivraisonPageRoutingModule } from './typelivraison-routing.module';

import { TypelivraisonPage } from './typelivraison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypelivraisonPageRoutingModule
  ],
  declarations: [TypelivraisonPage]
})
export class TypelivraisonPageModule {}
