import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RacestatsPage } from './racestats.page';

const routes: Routes = [
  {
    path: '',
    component: RacestatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RacestatsPageRoutingModule {}
