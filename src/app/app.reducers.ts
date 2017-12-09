import * as patient from "./patient/reducer";
import * as dashboard from "./dashboard/reducer";
import { IAppState } from "./app.store";

export const initialState: IAppState = {
    patient: patient.initialState,
    dashboard: dashboard.initialState
};

export const appReducers = {
    patient: patient.reducer,
    dashboard: dashboard.reducer
};