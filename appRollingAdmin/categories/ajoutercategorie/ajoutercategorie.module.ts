import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutercategoriePageRoutingModule } from './ajoutercategorie-routing.module';

import { AjoutercategoriePage } from './ajoutercategorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutercategoriePageRoutingModule
  ],
  declarations: [AjoutercategoriePage]
})
export class AjoutercategoriePageModule {}
