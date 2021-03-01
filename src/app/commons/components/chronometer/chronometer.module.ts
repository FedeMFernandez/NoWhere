import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { ROUTE } from '../../constants/route.constant';
import { chronometerReducer } from 'src/app/commons/store/reducers/chronometer.reducer';
import { ChronometerComponent } from './chronometer.component';

@NgModule({
    imports: [
        StoreModule.forFeature(ROUTE.CHRONOMETER, chronometerReducer),
    ],
    declarations: [
        ChronometerComponent
    ],
    exports: [
        ChronometerComponent
    ]
})
export class ChronometerComponentModule {}
