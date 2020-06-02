import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaceinfoPage } from './raceinfo.page';

const routes: Routes = [
  {
    path: '',
    component: RaceinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaceinfoPageRoutingModule {}
