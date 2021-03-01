import { Component, ViewEncapsulation } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { ChronometerService } from 'src/app/commons/services/chronometer/chronometer.service';
import { ROUTE } from './commons/constants/route.constant';
import { NavService } from './commons/services/nav.service';
import { AuthService } from './commons/services/auth/auth.service';

declare var TestFairy: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private navService: NavService,
    private chronometerService: ChronometerService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.authService.init();
    this.authService.isAuth.subscribe((auth) => {
      if (auth) {
        this.navService.push(ROUTE.HOME);
        this.chronometerService.init();
      } else {
        this.navService.push(ROUTE.AUTH, undefined);
      }
    });

    this.platform.ready().then(() => {
      TestFairy.begin('SDK-wfggCggZ');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
