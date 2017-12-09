import { Patient } from "../models/patient";
import { GridColumn, GridSettings } from "../grid/grid-settings.model";

export interface IDashboardState {
    patients: Array<Patient>;
    gridSettings: GridSettings
}