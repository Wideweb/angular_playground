import { Component, OnInit } from '@angular/core';

import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    heroes: Hero[];

    constructor(private heroService: HeroService) { }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes() {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }

    addHero(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.addHero({ name } as Hero)
            .subscribe(hero => this.heroes.push(hero));
    }

    deleteHero(hero: Hero): void {
        this.heroService.deleteHero(hero).subscribe(() => {
            this.heroes = this.heroes.filter(h => h.id != hero.id);
        });
    }
}
