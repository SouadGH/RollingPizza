import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmercommandePageRoutingModule } from './confirmercommande-routing.module';

import { ConfirmercommandePage } from './confirmercommande.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmercommandePageRoutingModule
  ],
  declarations: [ConfirmercommandePage]
})
export class ConfirmercommandePageModule {}
