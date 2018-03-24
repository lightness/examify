import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { Exam } from "../common/entity/exam.entity";
import { CommonApiService } from "../common/common-api.service";


@Injectable()
export class ExamsHistoryResolver implements Resolve<Exam[]> {

    public constructor(
        private commonApiService: CommonApiService
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<Exam[]> {
        let userId: number = route.params["userId"];

        if (!userId) {
            return;
        }

        return this.commonApiService.getUsersExamsHistory(userId);
    }
}
