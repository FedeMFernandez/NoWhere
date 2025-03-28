import { ROUTE } from './../../constants/route.constant';
import { NavService } from './../nav.service';
import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(
    private authService: AuthService
  ) { }

  canLoad(): Observable<boolean> {
    return this.authService.isAuth;
  }
}
