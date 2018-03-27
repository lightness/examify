import { tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";

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
            .pipe(tap(this.handle.bind(this), this.handleError.bind(this)));
    }

    private handle(event): void {
        if (event instanceof HttpResponse) {
            let responseToken: string = (event as HttpResponse<any>).headers.get("Authorization");

            if (responseToken) {
                this.authService.setToken(responseToken);
            }
        }
    }

    private handleError(error): void {
        if (error instanceof HttpErrorResponse) {
            if (error.status == 401 || error.status == 403) {
                this.authService.signOut();
            }
        }
    }
}
