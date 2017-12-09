import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBaseComponent } from '../shared/form/form-base/form-base.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        super();
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.minLength(5)]],
            password: ['', [Validators.required]]
        });
    }

    onSubmitSucceed() {
        this.authService.login(this.form.value.email, this.form.value.password).subscribe(_ => {
            this.router.navigate(['/dashboard']);
        });
    }
}
