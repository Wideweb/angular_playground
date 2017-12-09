import { IPatientState } from "./patient/store";
import { IDashboardState } from "./dashboard/store";

export interface IAppState {
    patient: IPatientState;
    dashboard: IDashboardState
}