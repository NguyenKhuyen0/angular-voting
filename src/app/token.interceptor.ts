import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { UserInfoService } from './user-info.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private userInfoService: UserInfoService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.userInfoService.customKeyCloak && this.userInfoService.customKeyCloak.token)
        {
            const authToken = this.userInfoService.customKeyCloak.token;
    
            request = request.clone({
                setHeaders: {
                    'Authorization': 'Bearer ' + authToken,
    
                }
            });
        }
        return next.handle(request);
    }
}