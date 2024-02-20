import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailemployePageRoutingModule } from './detailemploye-routing.module';

import { DetailemployePage } from './detailemploye.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailemployePageRoutingModule
  ],
  declarations: [DetailemployePage]
})
export class DetailemployePageModule {}
