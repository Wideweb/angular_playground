import { Injectable } from '@angular/core';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalService {

    constructor(private ngbModal: NgbModal) { }

    showConfirmationModal(): Promise<any> {
        const modalRef = this.ngbModal.open(ConfirmModalComponent, { windowClass: 'app-modal' });
        modalRef.componentInstance.message = 'Are you sure you want to reset the form?';
        return modalRef.result;
    }

}
