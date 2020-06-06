import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RacestatsPageRoutingModule } from './racestats-routing.module';

import { RacestatsPage } from './racestats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RacestatsPageRoutingModule
  ],
  declarations: [RacestatsPage]
})
export class RacestatsPageModule {}
