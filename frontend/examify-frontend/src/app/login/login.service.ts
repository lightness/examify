import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

import { Permission } from "../common/entity/permission.enum";
import { AuthService } from "../common/auth/auth.service";
import { CommonApiService } from "../common/common-api.service";


@Injectable()
export class LoginService {

    constructor(
        private commonApiService: CommonApiService,
        private authService: AuthService,
        private router: Router
    ) { }

    public login(username?: string, password?: string): Observable<any> {
        return this.commonApiService.login(username, password)
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


}
