import { NgModule } from "@angular/core";
import { Scroll } from "./components/scroll/scroll";
import { WindowRef } from "./services/window-ref";
import { UtilsService } from "./services/utils.service";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { CommonModule } from "@angular/common";
import { NavScrollSection } from "./components/nav-scroll/nav-scroll-section.directive";
import { NavScrollTitle } from "./components/nav-scroll/nav-scroll-section-title.directive";
import { NavScroll } from "./components/nav-scroll/nav-scroll.directive";
import { StickyBarDirective } from "./components/sticky-bar/sticky-bar.directive";
import { CurrencyFormatterDirective } from "./form/formatters/currency-formatter-directive";
import { CustomCurrencyPipe } from "./form/pipes/custom-currency.pipe";
import { ToastMessageService } from "./services/toast-message.service";
import { ToastMessagesComponent } from "./components/toast-messages/toast-messages.component";

const SHARED_COMPONENTS = [
    NavScrollSection,
    NavScrollTitle,
    NavScroll,
    SidebarComponent,
    StickyBarDirective,
    CustomCurrencyPipe,
    CurrencyFormatterDirective,
    ToastMessagesComponent
];

@NgModule({
    declarations: SHARED_COMPONENTS,
	exports: SHARED_COMPONENTS,
    imports: [
		CommonModule 
	],
    providers: [
        WindowRef,
		UtilsService,
        Scroll,
        CustomCurrencyPipe,
        ToastMessageService
	]
})
export class SharedModule { }
