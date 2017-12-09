import { ActionReducer } from '@ngrx/store';
import { Patient } from '../models/patient';
import { IAction } from '../models/action';
import { IDashboardState } from './store';
import { SET_DASHBOARD_COLUMNS } from './actions';
import { GridSettings } from '../grid/grid-settings.model';

export const initialState: IDashboardState = {
    patients: [],
    gridSettings: new GridSettings()
};

export function reducer(state: IDashboardState = initialState, action: IAction): IDashboardState {
    switch (action.type) {
        default:
            return state;
    }
}