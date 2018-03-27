import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { User } from "../entity/user.entity";
import { CommonApiService } from "../common-api.service";


@Injectable()
export class UserResolver implements Resolve<User> {

    public constructor(
        private commonApiService: CommonApiService
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<User> {
        let userId: number = +route.params["userId"];

        if (!userId) {
            return;
        }

        return this.commonApiService.getUser(userId);
    }

}
