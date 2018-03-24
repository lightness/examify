import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { CommonApiService, UserStatisticsDto } from "../common/common-api.service";
import { CalculationsService, ExamStatistics } from "../common/calculations.service";


@Injectable()
export class DashboardService {

    constructor(
        private commonApiService: CommonApiService,
        private calculationsService: CalculationsService,
    ) { }

    public getUserStatistics(userId: number, topicId?: number): Observable<ExamStatistics> {
        return this.commonApiService.getUserStatistics(userId, topicId)
            .pipe(
                map((userStatistics: UserStatisticsDto) => this.calculationsService.calculateExamStatistics(userStatistics.exams))
            );
    }
}


