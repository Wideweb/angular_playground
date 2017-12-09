import { Component, OnInit, Input } from '@angular/core';
import { FormBaseComponent } from '../../shared/form/form-base/form-base.component';

@Component({
    selector: 'app-additional-info',
    templateUrl: './additional-info.component.html',
    styleUrls: ['./additional-info.component.scss']
})
export class AdditionalInfoComponent extends FormBaseComponent implements OnInit {

    @Input() form;

    constructor() {
        super();
    }

    ngOnInit() { }

}
