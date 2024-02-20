import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouteremployerPageRoutingModule } from './ajouteremployer-routing.module';

import { AjouteremployerPage } from './ajouteremployer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouteremployerPageRoutingModule
  ],
  declarations: [AjouteremployerPage]
})
export class AjouteremployerPageModule {}
