import { TimerModel } from './../../models/timer.model';
import { createAction, props } from '@ngrx/store';
import { State } from '../reducers/chronometer.reducer';

const prefix = '[CHRONOMETER_ACTION]';
const setChronometerType = `${prefix} Created new timer.`;
const updateTimeType = `${prefix} Updated time.`;
const clearChronometerType = `${prefix} Timer cleared.`;

export const setChronometer = createAction(setChronometerType, props<{
    chronometer: State
}>());
export const updateTime = createAction(updateTimeType, props<{
    time: any;
}>());
export const clearChronometer = createAction(clearChronometerType);
