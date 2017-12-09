import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

    @Input() message: string;

    constructor(public activeModal: NgbActiveModal, private router: Router) { }

    close() {
        this.activeModal.close();
    }

    dismiss() {
        this.activeModal.dismiss();
    }

    route() {
        this.router.navigateByUrl('/dashboard')
    }
}
