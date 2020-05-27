import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RacesPageRoutingModule } from './races-routing.module';

import { RacesPage } from './races.page';
import { ComponentsModule } from 'src/app/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RacesPageRoutingModule, 
    ComponentsModule
  ],
  declarations: [RacesPage]
})
export class RacesPageModule {}
