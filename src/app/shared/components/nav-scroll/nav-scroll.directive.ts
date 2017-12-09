import { Directive, Input, ContentChildren, QueryList, AfterContentInit, HostListener } from "@angular/core";
import { NavScrollSection } from "./nav-scroll-section.directive";
import { NavScrollTitle } from "./nav-scroll-section-title.directive";
import { NavScrollService } from "./nav-scroll.service";
import { NavScrollSettings } from "./nav-scroll-settings";

@Directive({ 
    selector: 'app-nav-scroll',
    providers: [NavScrollService, NavScrollSettings] 
})
export class NavScroll implements AfterContentInit {

    @Input() activeId: string;

    @ContentChildren(NavScrollSection, { descendants: true }) sections: QueryList<NavScrollSection>;
    @ContentChildren(NavScrollTitle, { descendants: true }) titles: QueryList<NavScrollTitle>;

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        this.update();
    }

    constructor(private navScrollService: NavScrollService) { }

    ngAfterContentInit() {
        !this.select(this.activeId) && this.update();

        this.titles.forEach(title => {
            title.select.subscribe(id => this.select(id))
        });
    }

    private update() {
        this.activeId = this.navScrollService.updateCurrentSection(this.sections, this.titles);
    }

    private select(id) {
        if (this.navScrollService.select(this.sections, id)) {
            this.activeId = id;
        }
    }
}