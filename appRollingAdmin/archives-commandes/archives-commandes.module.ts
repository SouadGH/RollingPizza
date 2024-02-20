import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchivesCommandesPageRoutingModule } from './archives-commandes-routing.module';

import { ArchivesCommandesPage } from './archives-commandes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchivesCommandesPageRoutingModule
  ],
  declarations: [ArchivesCommandesPage]
})
export class ArchivesCommandesPageModule {}
