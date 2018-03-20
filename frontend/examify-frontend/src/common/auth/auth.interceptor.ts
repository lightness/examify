import { tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from "@angular/common/http";

import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string = this.authService.getToken();

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request)
            .pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    let responseToken: string = (event as HttpResponse<any>).headers.get("Authorization");

                    if (responseToken) {
                        this.authService.setToken(responseToken);
                    }
                }
            })
            );
    }
}
