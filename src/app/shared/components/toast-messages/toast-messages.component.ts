import { Component, OnInit } from '@angular/core';
import { ToastMessageService } from '../../services/toast-message.service';
import { Observable } from 'rxjs/Observable';
import { ToastrMessage } from './toastr-message';

@Component({
    selector: 'app-toast-messages',
    templateUrl: './toast-messages.component.html',
    styleUrls: ['./toast-messages.component.scss']
})
export class ToastMessagesComponent implements OnInit {

    messages$: Observable<Array<ToastrMessage>>;

    constructor(private toastMessageService: ToastMessageService) {
        this.messages$ = this.toastMessageService.getMessages();
    }

    ngOnInit() { }

}
