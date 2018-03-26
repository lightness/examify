import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

import { Permission } from "../common/entity/permission.enum";
import { AuthService } from "../common/auth/auth.service";
import { CommonApiService } from "../common/common-api.service";
import { RoutingService } from "../common/routing.service";


@Injectable()
export class LoginService {

    constructor(
        private commonApiService: CommonApiService,
        private authService: AuthService,
        private router: Router,
        private routingService: RoutingService
    ) { }

    public login(username?: string, password?: string): Observable<any> {
        return this.commonApiService.login(username, password)
            .pipe(
            tap((permissions: Permission[]) => {
                this.authService.setPermissions(permissions);

                this.navigateAfterLogin();
            })
            );
    }

    private navigateAfterLogin() {
        let route;

        if (this.authService.hasPermissions([Permission.MANAGE_CONTENT])) {
            route = this.routingService.getTopicsManagePage();
        } else if (this.authService.hasPermissions([Permission.MANAGE_STUFF])) {
            route = this.routingService.getUsersManagePage();
        } else {
            route = this.routingService.getExamSelectPage();
        }

        this.router.navigate(route);
    }

}
