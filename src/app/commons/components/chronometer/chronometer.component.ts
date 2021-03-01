import { ChronometerService } from 'src/app/commons/services/chronometer/chronometer.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ChronometerState } from 'src/app/commons/store/reducers/chronometer.reducer';
import { getTime } from '../../store/selectors/chronometer.selectors';

@Component({
  selector: 'app-chronometer-component',
  templateUrl: './chronometer.component.html',
  styleUrls: ['./chronometer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChronometerComponent implements OnInit {

  //#region DECLARATIONS
  hours: string | number = '00';
  minutes: string | number = '00';
  seconds: string | number = '00';
  //#endregion

  constructor(
    private store: Store<ChronometerState>
  ) { }

  ngOnInit(): void {
    this.store.select(getTime)
    .subscribe((time) => {
      this.timeFormat(time || 0);
    });
  }

  private timeFormat(time: any): void {
    this.seconds = time % 60;
    this.minutes = (Math.floor(time / 60)) % 60;
    this.hours = Math.floor((time / 60) / 60);
    this.seconds =  this.seconds < 10 ? `0${this.seconds}` : this.seconds;
    this.minutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
    this.hours = this.hours < 10 ? `0${this.hours}` : this.hours;
  }
}
