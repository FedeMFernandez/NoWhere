import { HomeState } from './../reducers/home.reducer';

export const getMonth = (state: HomeState) => state.home.month;
export const getUsages = (state: HomeState) => state.home.usages;
