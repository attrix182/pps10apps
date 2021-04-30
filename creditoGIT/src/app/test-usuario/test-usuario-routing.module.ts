import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestUsuarioPage } from './test-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: TestUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestUsuarioPageRoutingModule {}
