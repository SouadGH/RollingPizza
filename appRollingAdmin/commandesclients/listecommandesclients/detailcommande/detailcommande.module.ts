import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailcommandePageRoutingModule } from './detailcommande-routing.module';

import { DetailcommandePage } from './detailcommande.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailcommandePageRoutingModule
  ],
  declarations: [DetailcommandePage]
})
export class DetailcommandePageModule {}
