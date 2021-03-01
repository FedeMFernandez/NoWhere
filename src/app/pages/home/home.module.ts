import { NoContentTextModule } from './../../commons/components/no-content-text/no-content-text.module';
import { StoreModule } from '@ngrx/store';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ChronometerComponentModule } from './../../commons/components/chronometer/chronometer.module';
import { LogoutButtonComponentModule } from 'src/app/commons/components/logout-button/logout-button.module';
import { UsageBoxComponentModule } from 'src/app/commons/components/usage-box/usage-box.module';
import { ROUTE } from './../../commons/constants/route.constant';
import { homeReducer } from './../../commons/store/reducers/home.reducer';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ChronometerComponentModule,
    LogoutButtonComponentModule,
    UsageBoxComponentModule,
    StoreModule.forFeature(ROUTE.HOME, homeReducer),
    Ng2GoogleChartsModule,
    NoContentTextModule
  ],
  declarations: [
    HomePage
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomePageModule {}
