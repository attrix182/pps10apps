import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashAnimadoPageRoutingModule } from './splash-animado-routing.module';

import { SplashAnimadoPage } from './splash-animado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashAnimadoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SplashAnimadoPage]
})
export class SplashAnimadoPageModule {}
