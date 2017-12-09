import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //const auth = this.injector.get(AuthService);
        const auth = this.injector.get(AuthService);

        request = request.clone({
            setHeaders: {
                //Authorization: `Bearer ${auth.getToken()}`
                Authorization: `Bearer ${auth.getAccessToken().accessToken}`
            }
        });
        return next.handle(request);
    }
}