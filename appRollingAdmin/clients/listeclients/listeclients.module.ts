import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeclientsPageRoutingModule } from './listeclients-routing.module';

import { ListeclientsPage } from './listeclients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeclientsPageRoutingModule
  ],
  declarations: [ListeclientsPage]
})
export class ListeclientsPageModule {}
