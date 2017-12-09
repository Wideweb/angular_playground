import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    private userUrl = 'api/user';

    constructor(private http: HttpClient, private router: Router) { }

    login(name: string, password: string): Observable<User> {
        return this.http.post<User>(this.userUrl, { name: name, password: password }).pipe(
            tap(user => this.storeUserData(user)),
            catchError(this.handleError<User>('login'))
        );
    }

    register(user: User) {
        return this.http.post(this.userUrl, user).pipe(
            tap(() => this.storeUserData(user))
        );
    }

    loginRedirect() {
        this.router.navigateByUrl('/login');
    }

    logout() {
        this.clearUserDara();
        this.loginRedirect();
    }

    getUserData(): User {
        let user = JSON.parse(localStorage.getItem('current_user')) as User;
        return user;
    }

    isAuthenticated(): boolean {
        return !!this.getUserData();
    }

    getAccessToken(): User {
        if (!this.isAuthenticated()) {
            return null;
        }

        const user = this.getUserData();
        return user || new User();
    }

    private storeUserData(user: User): void {
        localStorage.setItem('current_user', JSON.stringify(user))
    }

    private clearUserDara() {
        localStorage.removeItem('current_user');
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
