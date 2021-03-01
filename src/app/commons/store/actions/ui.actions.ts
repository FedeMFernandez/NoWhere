import { createAction, props } from '@ngrx/store';

const prefix = '[HOME_ACTIONS]';
const setLoadingType = `${prefix} Loading state changed.`;

export const setLoading = createAction(setLoadingType, props<{
    loading: boolean;
}>());
