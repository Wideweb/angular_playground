import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import * as toastTemplate from './toast.html';
import { ToastMessageService } from './shared/services/toast-message.service';
import { setTimeout } from 'timers';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private toastMessageService: ToastMessageService) {
        this.toastr.setRootViewContainerRef(vcr);
        //this.showCustom();
        setTimeout(() => this.toastMessageService.showInfo('1'), 0);
        setTimeout(() => this.toastMessageService.showError('2'), 1000);
        setTimeout(() => this.toastMessageService.showInfo('3'), 2000);
        setTimeout(() => this.toastMessageService.showError('4'), 3000);
    }


    showCustom() {
        this.toastr.custom(toastTemplate.toString(), null, { enableHTML: true, toastLife: 300000, positionClass: 'custom-toast', showCloseButton: false });
    }
}
