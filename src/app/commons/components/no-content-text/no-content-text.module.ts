import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoContentTextComponent } from './no-content-text.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    NoContentTextComponent
  ],
  exports: [
    NoContentTextComponent
  ]
})
export class NoContentTextModule { }