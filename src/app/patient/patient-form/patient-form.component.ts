import { Component, OnInit } from '@angular/core';
import { FormBaseComponent } from '../../shared/form/form-base/form-base.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { IPatientState } from '../store';
import { CreatePatientAction, CreatePatientResetAction } from '../actions';
import { Patient } from '../../models/patient';
import { IAppState } from '../../app.store';
import { REQUEST_SUCCEED } from '../../models/request-state';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'app-patient-form',
    templateUrl: './patient-form.component.html',
    styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent extends FormBaseComponent implements OnInit {

    public errorMessage: string;

    constructor(private formBuilder: FormBuilder, private router: Router, private store: Store<IAppState>, private modalService: ModalService) {
        super();
        this.initForm();
        //this.reset();
        this.store.select(s => s.patient.createPatientStatus).subscribe((s) => {
            if (!s) {
                this.errorMessage = null;
                return;
            }

            if (s.error) {
                this.errorMessage = s.message;
            } else {
                console.log('success');
            }
        });
    }

    initForm() {
        let general = this.formBuilder.group({
            firstName: ['123', [Validators.required, Validators.minLength(5)]],
            lastName: ['', [Validators.required, Validators.minLength(5)]],
            email: ['123', [Validators.required, Validators.minLength(5)]],
            age: ['', [Validators.required]],
            maritalStatus: ['', [Validators.required]],
            birth: [new Date().toISOString(), [Validators.required]]
        });

        let additional = this.formBuilder.group({
            firstName: ['123', [Validators.required, Validators.minLength(5)]],
            lastName: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.minLength(5)]]
        });

        this.form = this.formBuilder.group({ general, additional });
    }

    ngOnInit() {
        this.router.events.subscribe(s => {
            if (s instanceof NavigationEnd) {
                const tree = this.router.parseUrl(this.router.url);
                if (tree.fragment) {
                    const element = document.querySelector("#" + tree.fragment);
                    if (element) {
                        this.scroll(element.getBoundingClientRect().top);
                    }
                }
            }
        });
    }

    scroll(targetYPos) {
        Observable.interval(10)
            .scan((acc, curr) => acc + 20, window.pageYOffset) // scan takes all values from an emitted observable stream and accumulates them, here you're taking the current position, adding a scroll step (fixed at 5, though this could also be dynamic), and then so on, its like a for loop with +=, but you emit every value to the next operator which scrolls, the second argument is the start position
            .map(position => position > targetYPos ? targetYPos : position)
            .do(position => window.scrollTo(0, position)) /// here is where you scroll with the results from scan
            .takeWhile(val => val < targetYPos)
            .subscribe(); // stop when you get to the target*/

    }

    reset(): void {
        this.modalService.showConfirmationModal()
            .then(() => this.onResetConfirmed())
            .catch(_ => _);
    }

    onResetConfirmed() {
        super.reset();
        this.store.dispatch(new CreatePatientResetAction());
    }

    onSubmitSucceed(): void {
        this.errorMessage = null;
        console.log(this.form.value);
        this.store.dispatch(new CreatePatientAction(new Patient(1, 'sasha', 22)));
    }
}
