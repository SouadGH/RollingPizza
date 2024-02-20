import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeemployesPageRoutingModule } from './listeemployes-routing.module';

import { ListeemployesPage } from './listeemployes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeemployesPageRoutingModule
  ],
  declarations: [ListeemployesPage]
})
export class ListeemployesPageModule {}
