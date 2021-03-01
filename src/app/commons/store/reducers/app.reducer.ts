import { UIState } from './ui.reducer';
import { HomeState } from './home.reducer';
import { ActionReducerMap, createReducer, on, Action } from '@ngrx/store';

import { ChronometerState } from 'src/app/commons/store/reducers/chronometer.reducer';
import * as APP_ACTIONS from 'src/app/commons/store/actions/app.actions';
import * as AUTH_REDUCER from 'src/app/commons/store/reducers/auth.reducer';
import * as UI_REDUCER from 'src/app/commons/store/reducers/ui.reducer';

export interface AppState extends ChronometerState, HomeState, UIState {
    auth: AUTH_REDUCER.State;
}
const initialState = {} as AppState;

export const AppReducer: ActionReducerMap<AppState> = {
    auth: AUTH_REDUCER.authReducer,
    ui: UI_REDUCER.uiReducer,
};

const APP_REDUCER = createReducer(
    initialState,
    on(APP_ACTIONS.clear, clearRedux)
);

export function appReducer(state: AppState, action: Action): AppState {
    return APP_REDUCER(state, action);
}

function clearRedux(state: AppState): AppState {
    return {
        ...state,
        auth: undefined,
        chronometer: undefined
    };
}
