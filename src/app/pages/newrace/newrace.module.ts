import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewracePageRoutingModule } from './newrace-routing.module';

import { NewracePage } from './newrace.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewracePageRoutingModule
  ],
  declarations: [NewracePage]
})
export class NewracePageModule {}
