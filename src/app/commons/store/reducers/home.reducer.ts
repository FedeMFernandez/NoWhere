import { createReducer, Action, on } from '@ngrx/store';

import { TimerModel } from './../../models/timer.model';
import * as ACTIONS from './../actions/home.actions';

export interface HomeState {
    home?: State;
}
interface State {
    month: number;
    usages: Array<TimerModel>;
}
const initialState: State = {
    month: new Date().getMonth(),
    usages: []
};

const HOME_REDUCER = createReducer(initialState,
    on(ACTIONS.setMonth, setMonth),
    on(ACTIONS.pushUsage, pushUsage),
    on(ACTIONS.clearUsage, clearUsage)
);

export function homeReducer(state: State, action: Action) {
    return HOME_REDUCER(state, action);
}

function setMonth(state: State, { month }): State {
    return {
        ...state,
        month
    };
}

function pushUsage(state: State, { timer }): State {
    return {
        ...state,
        usages: [
            ...state.usages,
            timer
        ]
    };
}

function clearUsage(state: State): State {
    return {
        ...state,
        usages: []
    };
}
