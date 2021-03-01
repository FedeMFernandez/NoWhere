import { Action, createReducer, on } from '@ngrx/store';

import * as ACTIONS from '../actions/auth.actions';
import { UserModel } from '../../models/user.model';

export interface State {
    user?: UserModel;
}
const initialState: State = { };

const AUTH_REDUCER = createReducer(initialState,
    on(ACTIONS.setUser, setUser),
    on(ACTIONS.clearUser, clearUser),
);

export function authReducer(state: State, action: Action) {
    return AUTH_REDUCER(state, action);
}

function setUser(state: State, { user }): State {
    return {
        ...state,
        user
    };
}

function clearUser(state: State): State {
    return state = initialState;
}
