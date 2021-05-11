import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisFotosPageRoutingModule } from './mis-fotos-routing.module';

import { MisFotosPage } from './mis-fotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisFotosPageRoutingModule
  ],
  declarations: [MisFotosPage]
})
export class MisFotosPageModule {}
