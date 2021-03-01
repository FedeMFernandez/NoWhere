import { AuthService } from './../../services/auth/auth.service';
import { Component, ViewEncapsulation } from '@angular/core';

import { ROUTE } from 'src/app/commons/constants/route.constant';
import { NavService } from './../../services/nav.service';

@Component({
  selector: 'app-logout-button-component',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LogoutButtonComponent {

  constructor(
    private authService: AuthService,
    private navService: NavService
  ) { }

  logout() {
    this.authService.logOut();
    this.navService.pop(ROUTE.AUTH, undefined);
  }
}
