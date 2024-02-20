import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsclientPageRoutingModule } from './detailsclient-routing.module';

import { DetailsclientPage } from './detailsclient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsclientPageRoutingModule
  ],
  declarations: [DetailsclientPage]
})
export class DetailsclientPageModule {}
