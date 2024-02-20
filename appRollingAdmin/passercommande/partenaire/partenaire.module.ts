import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartenairePageRoutingModule } from './partenaire-routing.module';

import { PartenairePage } from './partenaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartenairePageRoutingModule
  ],
  declarations: [PartenairePage]
})
export class PartenairePageModule {}
