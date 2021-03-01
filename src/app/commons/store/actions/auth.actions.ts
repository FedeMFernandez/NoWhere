import { createAction, props } from '@ngrx/store';

import { UserModel } from '../../models/user.model';

const prefix = '[AUTH_ACTION]';
const setUserType = `${prefix} Set user.`;
const clearUserType = `${prefix} Clear user.`;

export const setUser = createAction(setUserType, props<{ user: UserModel }>());
export const clearUser = createAction(clearUserType);
