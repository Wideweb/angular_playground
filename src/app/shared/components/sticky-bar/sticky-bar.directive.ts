import { Input, HostBinding, HostListener, ElementRef, Renderer2, Directive, AfterViewInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { WindowRef } from '../../services/window-ref';

@Directive({
    selector: 'app-sticky-bar',
    host: {
        "[style.display]": "'block'"
    }
})
export class StickyBarDirective implements AfterViewInit {

    initialPositionTop: number;

    @Input() classOnStick: string;
    @Input() remainWidth: boolean = true;

    @HostBinding('class.app-sticky-bar-sticked')
    sticked: boolean = false;

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        this.initialPositionTop < this.winRef.nativeWindow.pageYOffset
            ? this.stick()
            : this.unstick();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.remainWidth && this.updateBarWidth();
    }

    constructor(
        private elementRef: ElementRef,
        private utils: UtilsService,
        private winRef: WindowRef,
        private renderer: Renderer2) {
    }

    ngAfterViewInit(): void {
        this.initialPositionTop = this.utils.getPositionTop(this.elementRef.nativeElement);
        this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${this.elementRef.nativeElement.offsetHeight}px`);
    }

    stick() {
        this.sticked = true;
        if (this.classOnStick) {
            this.renderer.addClass(this.elementRef.nativeElement, this.classOnStick);
        }
        this.remainWidth && this.updateBarWidth();
    }

    unstick() {
        this.sticked = false;
        if (this.classOnStick) {
            this.renderer.removeClass(this.elementRef.nativeElement, this.classOnStick);
        }
    }

    private updateBarWidth() {
        this.renderer.setStyle(this.elementRef.nativeElement.children[0], 'width', `${this.elementRef.nativeElement.getBoundingClientRect().width}px`);
    }
}
