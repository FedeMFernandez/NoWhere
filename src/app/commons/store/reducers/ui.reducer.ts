import { createReducer, Action, on } from '@ngrx/store';

import * as ACTIONS from '../actions/ui.actions';

export interface UIState {
    ui: State;
}
interface State {
    isLoading: boolean;
}
const initialState: State = {
    isLoading: false
};

const UI_REDUCER = createReducer(initialState,
    on(ACTIONS.setLoading, setLoading),
);

export function uiReducer(state: State, action: Action) {
    return UI_REDUCER(state, action);
}

function setLoading(state: State, { loading }): State {
    return {
        ...state,
        isLoading: loading
    };
}
