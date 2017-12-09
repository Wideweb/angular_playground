import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-lookup',
    templateUrl: './lookup.component.html',
    styleUrls: ['./lookup.component.scss']
})
export class LookupComponent implements OnInit {

    @Input() options: Array<any>;
    @Output() lookup: EventEmitter<any> = new EventEmitter();

    form: FormGroup;
    selectedOption: any;
    lookupTerm: string;

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            lookupTerm: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.selectedOption = this.options[0];
    }

    selectOption(option) {
        this.selectedOption = option;
    }

    onSubmit() {
        if (this.form.valid) {
            this.lookup.emit({ term: this.form.value.lookupTerm, option: this.selectedOption });
        }
    }
}
