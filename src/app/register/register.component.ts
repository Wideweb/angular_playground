import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/form/validators/forbidden-name-validator';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { FormBaseComponent } from '../shared/form/form-base/form-base.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent extends FormBaseComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService) {
        super();
        this.initForm();
    }

    ngOnInit() { }

    initForm() {
        this.form = this.formBuilder.group({
            firstname: ['123', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required]],
            login: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmitSucceed() {
        /*this.authService.register(value).subscribe(_ => {
            this.router.navigate(['/dashboard']);
        });*/
    }
}
