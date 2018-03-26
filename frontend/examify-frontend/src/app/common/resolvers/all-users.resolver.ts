import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { User } from "../entity/user.entity";
import { AuthService } from "../auth/auth.service";
import { CommonApiService } from "../common-api.service";
import { Permission } from "../entity/permission.enum";


@Injectable()
export class AllUsersResolver implements Resolve<User[]> {

    public constructor(
        private authService: AuthService,
        private commonApiService: CommonApiService
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        if (!this.authService.hasPermissions([Permission.MANAGE_STUFF])) {
            return Observable.of(null);
        }

        return this.commonApiService.getAllUsers();
    }

}
