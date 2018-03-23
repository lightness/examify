import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { DashboardService } from "../dashboard.service";
import { ExamStatistics } from "../../../common/calculations.service";


@Injectable()
export class UserStatisticsResolver implements Resolve<ExamStatistics> {

    public constructor(
        private dashboardService: DashboardService
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<ExamStatistics> {
        let userId: number = route.params["userId"];
        let topicId: number = route.queryParams["topicId"];

        if (!userId) {
            return;
        }

        return this.dashboardService.getUserStatistics(userId, topicId);
    }
}
