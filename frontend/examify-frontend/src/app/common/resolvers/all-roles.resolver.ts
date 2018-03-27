import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { Role } from "../entity/role.entity";
import { AuthService } from "../auth/auth.service";
import { CommonApiService } from "../common-api.service";
import { Permission } from "../entity/permission.enum";


@Injectable()
export class AllRolesResolver implements Resolve<Role[]> {

    public constructor(
        private authService: AuthService,
        private commonApiService: CommonApiService
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<Role[]> {
        if (!this.authService.hasPermissions([Permission.MANAGE_STUFF])) {
            return Observable.of(null);
        }

        return this.commonApiService.getAllRoles();
    }

}
