import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

import { ApiService } from "../api.service";
import { Permission } from "../entity/permission.enum";
import { AuthService } from "../auth/auth.service";


@Injectable()
export class LoginService {

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private router: Router
    ) { }

    public login(username: string, password: string): Observable<any> {
        return this.loginRequest(username, password)
            .pipe(
            tap((permissions: Permission[]) => {
                this.authService.setPermissions(permissions);

                // TODO
                if (this.authService.hasPermissions([Permission.MANAGE_CONTENT])) {
                    this.router.navigate(["/admin"]);
                } else {
                    this.router.navigate(["/"]);
                }
            })
            );
    }

    private loginRequest(name: string, password: string): Observable<Permission[]> {
        return this.apiService.post("/auth/login", { name, password });
    }

}
