import { Directive, OnInit, ElementRef, HostListener, Input } from "@angular/core";
import { CustomCurrencyPipe } from "../pipes/custom-currency.pipe";

@Directive({ selector: "[currencyFormatter]" })
export class CurrencyFormatterDirective implements OnInit {

    private el: HTMLInputElement;

    constructor(
        private elementRef: ElementRef,
        private currencyPipe: CustomCurrencyPipe
    ) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.el.value = this.currencyPipe.transform(this.el.value);
    }

    @HostListener("focus", ["$event.target.value"])
    onFocus(value) {
        console.log("focus");
        this.el.value = this.currencyPipe.parse(value);
    }

    @HostListener("blur", ["$event.target.value"])
    onBlur(value) {
        console.log("blur");
        this.el.value = this.currencyPipe.transform(value);
    }

    @HostListener("input", ["$event.target.value"])
    onChange(value) {
        console.log("input");
        //this.el.value = this.currencyPipe.parse(value);
    }

}