import { Patient } from "../models/patient";

export interface IPatientState {
    patients: Array<Patient>;
    createPatientStatus: any;
}