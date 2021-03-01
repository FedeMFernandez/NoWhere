import { getStarted } from './../../commons/store/selectors/chronometer.selectors';
import { LoaderService } from './../../commons/services/loader.service';
import { ChronometerService } from '../../commons/services/chronometer/chronometer.service';
import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { ChronometerComponent } from './../../commons/components/chronometer/chronometer.component';
import { ROUTE } from 'src/app/commons/constants/route.constant';
import { NavService } from './../../commons/services/nav.service';
import { ChronometerState } from 'src/app/commons/store/reducers/chronometer.reducer';

@Component({
  selector: 'app-chronometer',
  templateUrl: 'chronometer.page.html',
  styleUrls: ['chronometer.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChronometerPage implements OnInit {


  //#region DECLARATIONS
  @ViewChild(ChronometerComponent) chronometer: ChronometerComponent;
  timeStarted = false;
  //#endregion

  constructor(
    private store: Store<ChronometerState>,
    private navService: NavService,
    private chronometerService: ChronometerService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.store.select(getStarted)
    .subscribe((started) => {
      this.timeStarted = started;
    });
  }

  public async start(): Promise<void> {
    await this.loaderService.show();
    try {
      await this.chronometerService.startTime();
    } catch (error) {
      console.log(error);
    }
    this.loaderService.hide();
  }

  public async stop(): Promise<void> {
    await this.loaderService.show();
    try {
      await this.chronometerService.stopTime();
    } catch (error) {
      console.log(error);
    }
    this.loaderService.hide();
  }

  public goto(){
    this.navService.push(ROUTE.HOME);
  }
}
