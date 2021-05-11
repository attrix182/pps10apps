import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisFotosPage } from './mis-fotos.page';

const routes: Routes = [
  {
    path: '',
    component: MisFotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisFotosPageRoutingModule {}
