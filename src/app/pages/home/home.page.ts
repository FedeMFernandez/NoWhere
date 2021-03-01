import { Platform } from '@ionic/angular';
import { GoogleChartComponent } from 'ng2-google-charts';
import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ChronometerService } from 'src/app/commons/services/chronometer/chronometer.service';
import { ChronometerComponent } from './../../commons/components/chronometer/chronometer.component';
import { UserModel } from './../../commons/models/user.model';
import { TimerModel } from './../../commons/models/timer.model';
import { setMonth } from './../../commons/store/actions/home.actions';
import { AppState } from './../../commons/store/reducers/app.reducer';
import { getMonth, getUsages } from './../../commons/store/selectors/home.selectors';
import { MESES } from './../../commons/constants/meses.constants';
import { LoaderService } from './../../commons/services/loader.service';
import { getStarted } from './../../commons/store/selectors/chronometer.selectors';
import { ROUTE } from './../../commons/constants/route.constant';
import { NavService } from './../../commons/services/nav.service';
import { getLoading } from 'src/app/commons/store/selectors/ui.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {

  //#region DECLARATIONS
  ROUTE = ROUTE;
  @ViewChild(ChronometerComponent, { static: true }) chronometer: ChronometerComponent;
  @ViewChild(GoogleChartComponent, { static: true }) chart: GoogleChartComponent;
  timeStarted: boolean;
  meses = [];
  selectedMonth: number;
  usages: Array<TimerModel>;
  inUse: boolean;
  chartData = {
    chartType: 'PieChart',
    dataTable: []
  };
  loading: boolean;
  backButtonSubscription: Subscription;
  backButtonState: number;
  backButtonStateEnum = {
    Initial: 1,
  };
  //#endregion

  constructor(
    private store: Store<AppState>,
    private chronometerService: ChronometerService,
    private navService: NavService,
    private loaderService: LoaderService,
    private platform: Platform
  ) {
    Object.keys(MESES).forEach((key, index) => {
      this.meses.push({
        name: MESES[key],
        value: index
      });
    });
    this.backButtonState = this.backButtonStateEnum.Initial;
  }

  ngOnInit(): void {
    this.store.select(getStarted)
    .subscribe((started) => {
      this.timeStarted = started;
    });
    this.store.select(getMonth)
    .subscribe((month) => {
      this.selectedMonth = month;
      this.chronometerService.getAll(month);
    });
    this.store.select(getUsages)
    .subscribe((usages) => {
      this.usages = [...usages].reverse();
      this.inUse = false;
      if (this.usages[0] && !this.usages[0].to) {
        this.inUse = true;
      }
      if (this.usages.length) { this.createChartData(); }
    });
    this.store.select(getLoading)
    .subscribe((loading) => {
      this.loading = loading;
    });
  }

  ionViewDidEnter(): void {
    this.platform.ready().then(() => {
      this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(9999, async () => {
        switch (this.backButtonState) {
          case this.backButtonStateEnum.Initial:
            this.navService.exit();
            break;
          default: break;
        }
      });
    });
  }

  ionViewDidLeave(): void {
    if (this.backButtonSubscription && !this.backButtonSubscription.closed) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  public async start(): Promise<void> {
    if (this.inUse) { return; }
    await this.loaderService.show();
    try {
      await this.chronometerService.startTime();
    } catch (error) {
      console.log(error);
    }
    this.loaderService.hide();
  }

  public async stop(): Promise<void> {
    if (this.inUse && !this.timeStarted) { return; }
    await this.loaderService.show();
    try {
      await this.chronometerService.stopTime();
    } catch (error) {
      console.log(error);
    }
    this.loaderService.hide();
  }

  goto(path: string) {
    if (this.inUse && !this.timeStarted) { return; }
    this.navService.push(path);
  }

  select(value) {
    this.store.dispatch(setMonth({
      month: value
    }));
  }

  createChartData(): void {
    this.chartData = {
      chartType: 'PieChart',
      dataTable: [
        ['Task', 'Minutos usados'],
      ]
    };
    const users = new Array<UserModel>();
    this.usages.forEach((usage) => {
      // tslint:disable-next-line: no-shadowed-variable
      const user = users.find(user => usage.user.id === user.id);
      if (!user) {
        users.push(usage.user);
      }
    });

    users.forEach((user) => {
      const minutes = this.usages.map((use) => {
        if (use.user.id === user.id) {
          return use.totalMinutes;
        }
      });
      const total = minutes.reduce((a: number, b: number) => a + b);
      if (total > 0) {
        this.chartData.dataTable.push(
          [user.name, total]
        );
      }
    });
    if (this.chart) {
      this.chart.draw(this.chartData);
    }
  }
}

