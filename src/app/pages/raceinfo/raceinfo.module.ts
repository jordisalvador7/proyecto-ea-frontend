import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaceinfoPageRoutingModule } from './raceinfo-routing.module';

import { RaceinfoPage } from './raceinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaceinfoPageRoutingModule
  ],
  declarations: [RaceinfoPage]
})
export class RaceinfoPageModule {}
