import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

    constructor() { }

    getPositionTop(elem) {
        var box = elem.getBoundingClientRect();

        let body = document.body;
        let docEl = document.documentElement;

        let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        let clientTop = docEl.clientTop || body.clientTop || 0;
        let top = box.top + scrollTop - clientTop;

        return Math.round(top);
    }

}
