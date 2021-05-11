import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainAppPage } from './main-app.page';

const routes: Routes = [
  {
    path: '',
    component: MainAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainAppPageRoutingModule {}
