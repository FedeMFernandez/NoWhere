import { createReducer, on, Action } from '@ngrx/store';
import * as ACTIONS from '../actions/chronometer.actions';

export interface ChronometerState {
    chronometer?: State;
}
export interface State {
    started?: boolean;
    from?: Date;
    to?: Date;
    time?: number;
    documentId?: string;
}
const initialState: State = { };

const CHRONOMETER_REDUCER = createReducer(initialState,
    on(ACTIONS.setChronometer, setChronometer),
    on(ACTIONS.updateTime, updateTime),
    on(ACTIONS.clearChronometer, clearChronometer)
);

export function chronometerReducer(state: State, action: Action) {
    return CHRONOMETER_REDUCER(state, action);
}

function setChronometer(state: State, { chronometer }): State {
    return {
        ...state,
        ...chronometer
    };
}

function updateTime(state: State, { time }): State {
    return {
        ...state,
        time
    };
}

function clearChronometer(state: State): State {
    return state = initialState;
}
