import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { Role } from "../entity/role.entity";
import { CommonApiService } from "../common-api.service";


@Injectable()
export class RoleResolver implements Resolve<Role> {

    public constructor(
        private commonApiService: CommonApiService
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<Role> {
        let roleId: number = +route.params["roleId"];

        if (!roleId) {
            return;
        }

        return this.commonApiService.getRole(roleId);
    }

}
