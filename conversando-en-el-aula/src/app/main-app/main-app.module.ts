import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainAppPageRoutingModule } from './main-app-routing.module';

import { MainAppPage } from './main-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainAppPageRoutingModule
  ],
  declarations: [MainAppPage]
})
export class MainAppPageModule {}
