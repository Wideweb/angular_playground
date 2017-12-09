import { Directive, ElementRef, Input } from "@angular/core";
import { UtilsService } from "../../services/utils.service";

@Directive({ selector: '[appNavScrollSection]' })
export class NavScrollSection {

    @Input('appNavScrollSection') id: string;

    get positionTop() {
        return this.utils.getPositionTop(this.elementRef.nativeElement);
    }

    constructor(
        private elementRef: ElementRef,
        private utils: UtilsService
    ) { }
}
