import { FormGroup, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export abstract class FormBaseComponent {

    public form: FormGroup;
    private formSubmitAttempt: boolean;

    isFieldValid(field: string) {
        if (!this.form) {
            return;
        }

        return (!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt);
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    onSubmit() {
        this.formSubmitAttempt = true;
        if (this.form.valid) {
            this.onSubmitSucceed();
        } else {
            this.validateAllFormFields(this.form);
        }
    }

    reset() {
        this.form.reset();
        this.formSubmitAttempt = false;
    }

    onSubmitSucceed() { };
}
