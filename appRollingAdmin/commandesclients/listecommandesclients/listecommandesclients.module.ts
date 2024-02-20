import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListecommandesclientsPageRoutingModule } from './listecommandesclients-routing.module';

import { ListecommandesclientsPage } from './listecommandesclients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListecommandesclientsPageRoutingModule
  ],
  declarations: [ListecommandesclientsPage]
})
export class ListecommandesclientsPageModule {}
