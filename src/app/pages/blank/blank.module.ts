import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BlankPage } from './blank.page';

import { BlankPageRoutingModule } from './blank-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlankPageRoutingModule
  ],
  declarations: [BlankPage]
})
export class BlankPageModule {}
