
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ChronometerPageRoutingModule } from './chronometer-routing.module';
import { ChronometerPage } from './chronometer.page';
import { ChronometerComponentModule } from './../../commons/components/chronometer/chronometer.module';
import { LogoutButtonComponentModule } from 'src/app/commons/components/logout-button/logout-button.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChronometerPageRoutingModule,
    ChronometerComponentModule,
    LogoutButtonComponentModule
  ],
  declarations: [
    ChronometerPage
  ]
})
export class ChronometerPageModule {}
