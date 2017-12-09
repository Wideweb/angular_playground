import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { ToastrMessage, ToastrMessageType, ToastrMessageState } from '../components/toast-messages/toastr-message';

@Injectable()
export class ToastMessageService {

    private messages = new Array<ToastrMessage>();
    private messages$ = new Subject<Array<ToastrMessage>>();

    constructor() { }

    getMessages(): Observable<Array<ToastrMessage>> {
        return this.messages$.asObservable();
    }

    showInfo(content: string) {
        this.showMessage(content, ToastrMessageType.info);
    }

    showError(content: string) {
        this.showMessage(content, ToastrMessageType.error);
    }

    showMessage(content: string, type: ToastrMessageType) {
        const message = new ToastrMessage(type, content);
        this.messages.unshift(message);
        this.messages$.next(this.messages);

        Observable
            .timer(1000)
            .do(() => message.state = ToastrMessageState.closing)
            .delay(1000)
            .do(() => this.messages.pop())
            .do(() => this.messages$.next(this.messages))
            .subscribe();
    }

}
