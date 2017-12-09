import { Patient } from "../models/patient";
import { IAction } from "../models/action";

export const SET_DASHBOARD_COLUMNS = "set_dashboard_columns";

export class SetDashboardColumnsAction implements IAction {
    type = SET_DASHBOARD_COLUMNS;

    constructor(public payload = null) { }
}