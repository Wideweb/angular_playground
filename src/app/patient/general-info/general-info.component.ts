import { Component, OnInit, Input } from '@angular/core';
import { FormBaseComponent } from '../../shared/form/form-base/form-base.component';

@Component({
    selector: 'app-general-info',
    templateUrl: './general-info.component.html',
    styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent extends FormBaseComponent implements OnInit {

    @Input() form;

    constructor() {
        super();
    }

    ngOnInit() { }

}
