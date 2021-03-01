import { createAction, props } from '@ngrx/store';
import { TimerModel } from '../../models/timer.model';

const prefix = '[HOME_ACTIONS]';
const pushUsageType = `${prefix} Added usage.`;
const clearUsageType = `${prefix} Clear usages.`;
const setMonthType = `${prefix} Month changed.`;

export const setMonth = createAction(setMonthType, props<{
    month: number;
}>());
export const pushUsage = createAction(pushUsageType, props<{
    timer: TimerModel;
}>());
export const clearUsage = createAction(clearUsageType);
