import { Directive, Input, ElementRef, HostListener, EventEmitter, Output, Renderer, HostBinding } from "@angular/core";
import { UtilsService } from "../../services/utils.service";

@Directive({ selector: '[appNavScrollTitle]' })
export class NavScrollTitle {

    @Input('appNavScrollTitle') id: string;
    @Output() select = new EventEmitter<any>();

    @HostBinding('class.active') isActive = false;

    @HostListener('click') onClick() {
        this.select.emit(this.id);
    }

    get positionTop() {
        return this.utils.getPositionTop(this.elementRef.nativeElement);
    }

    constructor(
        private elementRef: ElementRef,
        private utils: UtilsService
    ) { }
}
