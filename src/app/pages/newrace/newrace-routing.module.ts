import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewracePage } from './newrace.page';

const routes: Routes = [
  {
    path: '',
    component: NewracePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewracePageRoutingModule {}
