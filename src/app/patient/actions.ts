import { Patient } from "../models/patient";
import { IAction } from "../models/action";

export const CREATE_PATIENT = "create_patient";
export const CREATE_PATIENT_RESET = "create_patient_reset";
export const CREATE_PATIENT_SUCCEED = "create_patient_succeed";
export const CREATE_PATIENT_FAILED = "create_patient_failed";

export class CreatePatientResetAction implements IAction {
    type = CREATE_PATIENT_RESET;

    constructor(public payload = null) { }
}

export class CreatePatientAction implements IAction {
    type = CREATE_PATIENT;

    constructor(public payload: Patient) { }
}

export class CreatePatientSucceedAction implements IAction {
    type = CREATE_PATIENT_SUCCEED;

    constructor(public payload: Patient) { }
}

export class CreatePatientFailedAction implements IAction {
    type = CREATE_PATIENT_FAILED;

    constructor(public payload = null) { }
}