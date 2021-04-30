import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestUsuarioPageRoutingModule } from './test-usuario-routing.module';

import { TestUsuarioPage } from './test-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestUsuarioPageRoutingModule
  ],
  declarations: [TestUsuarioPage]
})
export class TestUsuarioPageModule {}
