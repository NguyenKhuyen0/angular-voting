import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { KcService } from './initilizer';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private kcService: KcService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.kcService.getToken() || '';
        request = request.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + authToken,

            }
        });
        return next.handle(request);
    }
}