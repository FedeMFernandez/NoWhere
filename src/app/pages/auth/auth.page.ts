import { ChronometerService } from './../../commons/services/chronometer/chronometer.service';

import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonSlides, Platform } from '@ionic/angular';

import { AuthService } from './../../commons/services/auth/auth.service';
import { LoaderService } from './../../commons/services/loader.service';
import { NavService } from '../../commons/services/nav.service';
import { ROUTE } from 'src/app/commons/constants/route.constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  styleUrls: ['auth.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthPage {

  //#region DECLARATIONS
  @ViewChild('slideContent', { static: true }) slideContent: IonSlides;
  @ViewChild('slideFooter', { static: true }) slideFooter: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 200,
    allowTouchMove: false,
    slidesPerView: 1,
  };
  loginForm: FormGroup;
  registerForm: FormGroup;
  showPasswordLogin = false;
  showPasswordRegister = false;
  backButtonSubscription: Subscription;
  backButtonState: number;
  backButtonStateEnum = {
    Initial: 1,
  };
  //#endregion

  constructor(
    private navService: NavService,
    private loaderService: LoaderService,
    private authService: AuthService,
    private chronometerService: ChronometerService,
    private platform: Platform
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ionViewDidEnter(): void {
    this.platform.ready().then(() => {
      this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(9999, () => {
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

  public async submitLogin(value): Promise<void> {
    await this.loaderService.show();
    try {
      await this.authService.login(value.email, value.password);
      this.navService.push(ROUTE.HOME);
      this.chronometerService.init();
    } catch (error) {
      console.log(error);
    }
    this.loaderService.hide();
  }

  public async submitRegister(value): Promise<void> {
    await this.loaderService.show();
    try {
      await this.authService.register(value.name, value.email, value.password);
      this.navService.push(ROUTE.HOME);
    } catch (error) {
      console.log(error);
    }
    this.loaderService.hide();
  }

  public slideNext() {
    this.slideContent.slideNext();
    this.slideFooter.slideNext();
  }

  public slidePrev() {
    this.slideContent.slidePrev();
    this.slideFooter.slidePrev();
  }
}
