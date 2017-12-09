import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { CREATE_PATIENT, CreatePatientSucceedAction, CreatePatientFailedAction } from './actions';
import { HeroService } from '../services/hero.service';
import { IAction } from '../models/action';

@Injectable()
export class PatientEffects {
    @Effect()
    update$: Observable<IAction> = this.actions$
        .ofType(CREATE_PATIENT)
        .switchMap((action) =>
            this.heroService
                .addPatient(action.payload)
                .map((result) =>
                    result.error ? new CreatePatientFailedAction(result.data) : new CreatePatientSucceedAction(result)
                )
                .catch(e => of(new CreatePatientFailedAction(e)))
        );

    constructor(
        private heroService: HeroService,
        private actions$: Actions<IAction>
    ) { }
}