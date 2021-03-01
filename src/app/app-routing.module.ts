import { AuthGuardService } from './commons/services/auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ROUTE } from './commons/constants/route.constant';

const routes: Routes = [
  {
    path: ROUTE.AUTH,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: ROUTE.HOME,
    canLoad: [
      AuthGuardService
    ],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: ROUTE.CHRONOMETER,
    canLoad: [
      AuthGuardService
    ],
    loadChildren: () => import('./pages/chronometer/chronometer.module').then(m => m.ChronometerPageModule)
  },
  {
    path: '',
    redirectTo: ROUTE.HOME,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ROUTE.HOME,
    pathMatch: 'full'
  }
];

@NgModule({
imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
