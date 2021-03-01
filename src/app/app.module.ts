import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppReducer } from 'src/app/commons/store/reducers/app.reducer';
import { environment } from './../environments/environment';
import { AuthService } from './commons/services/auth/auth.service';
import { AuthGuardService } from './commons/services/auth/auth-guard.service';
import { LoaderService } from './commons/services/loader.service';
import { HttpClientModule } from '@angular/common/http';
import { IdentityService } from './commons/services/identity.service';
import { ChronometerService } from './commons/services/chronometer/chronometer.service';
import { StorageService } from './commons/services/storage.service';
import { NavService } from './commons/services/nav.service';
import { RestService } from './commons/services/rest.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StoreModule.forRoot(AppReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    HttpClientModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    StatusBar,
    SplashScreen,
    LoaderService,
    AuthService,
    AuthGuardService,
    RestService,
    NavService,
    IdentityService,
    StorageService,
    ChronometerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
