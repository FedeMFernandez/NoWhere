import { UIState } from './../reducers/ui.reducer';

export const getLoading = (state: UIState) => state.ui.isLoading;
