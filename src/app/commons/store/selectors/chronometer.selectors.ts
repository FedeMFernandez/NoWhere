import { ChronometerState } from '../reducers/chronometer.reducer';

export const getStarted = (state: ChronometerState) => state.chronometer.started;
export const getTime = (state: ChronometerState) => state.chronometer.time;

