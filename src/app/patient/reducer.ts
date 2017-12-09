import { ActionReducer } from '@ngrx/store';
import { CREATE_PATIENT, CREATE_PATIENT_FAILED, CREATE_PATIENT_SUCCEED, CREATE_PATIENT_RESET } from './actions';
import { IPatientState } from './store';
import { Patient } from '../models/patient';
import { IAction } from '../models/action';

export const initialState: IPatientState = {
    patients: [],
    createPatientStatus: null
};

export function reducer(state: IPatientState = initialState, action: IAction): IPatientState {
    switch (action.type) {
        case CREATE_PATIENT:
            return Object.assign({}, state, {
                createPatientStatus: null
            });
        case CREATE_PATIENT_SUCCEED:
            return Object.assign({}, state, {
                patients: [...state.patients, action.payload as Patient],
                createPatientStatus: { error: false }
            });
        case CREATE_PATIENT_FAILED:
            return Object.assign({}, state, {
                createPatientStatus: { error: true, message: action.payload }
            });
        case CREATE_PATIENT_RESET:
            return Object.assign({}, state, {
                createPatientStatus: null
            });
        default:
            return state;
    }
}