import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero';

@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

    heroes$: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(private heroService: HeroService) { }

    ngOnInit() {
        this.heroes$ = this.searchTerms.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((term: string) => this.heroService.searchHeroes(term)),
        )
    }

    search(term: string) {
        this.searchTerms.next(term);
    }

}
