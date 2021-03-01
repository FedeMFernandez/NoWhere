import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChronometerPage } from './chronometer.page';

const routes: Routes = [
  {
    path: '',
    component: ChronometerPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChronometerPageRoutingModule {}
