import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { MessageService } from './message.service';
import { Hero } from '../models/hero';
import { Patient } from '../models/patient';

@Injectable()
export class HeroService {

    private heroesUrl = 'api/heroes';

    constructor(
        private messageService: MessageService,
        private http: HttpClient) { }

    getPatients(): Observable<Array<Patient>> {
        return of([
            new Patient(1, "Alex", 22),
            new Patient(2, "Jhon", 35),
            new Patient(3, "Bill", 27),
            new Patient(4, "Jack", 21),
        ]);
    }

    addPatient(patient: Patient): Observable<any> {
        return this.http.post<Patient>(this.heroesUrl, patient).pipe(
            tap(patient => this.log(`added patient id=${patient.id}`))/*,
            catchError(this.handleError<Patient>('addPatient'))*/
        );
    }

    getHeroes(): Observable<Hero[]> {
        this.log('fetched heroes');
        return this.http.get<Hero[]>(this.heroesUrl).pipe(
            tap(heroes => this.log(`fetched heroes`)),
            catchError(this.handleError('getHeroes', []))
        );
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url).pipe(
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>('getHero'))
        );
    }

    searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim()) {
            return of([]);
        }

        const url = `${this.heroesUrl}?name=${term}`;
        return this.http.get<Hero[]>(url).pipe(
            tap(_ => this.log(`founded heroes term=${term}`)),
            catchError(this.handleError<Hero[]>('searchHeroes'))
        );
    }

    updateHero(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl, hero).pipe(
            tap(_ => this.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError<any>('updateHero'))
        );
    }

    addHero(hero: Hero): Observable<any> {
        return this.http.post<Hero>(this.heroesUrl, hero).pipe(
            tap(hero => this.log(`added hero id=${hero.id}`)),
            catchError(this.handleError<Hero>('addHero'))
        );
    }

    deleteHero(hero: Hero | number): Observable<any> {
        const id = typeof hero == "number" ? hero : hero.id;
        const url = `${this.heroesUrl}/${id}`;

        return this.http.delete<Hero>(url).pipe(
            tap(_ => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError('deleteHero'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<any> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of({ error: true, data: error });
        };
    }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}
