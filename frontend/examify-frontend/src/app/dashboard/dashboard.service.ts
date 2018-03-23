import { map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Exam } from "../../common/entity/exam.entity";
import { ApiService } from "../../common/api.service";
import { CalculationsService, ExamStatistics } from "../../common/calculations.service";


@Injectable()
export class DashboardService {

    constructor(
        private apiService: ApiService,
        private calculationsService: CalculationsService,
    ) { }

    public getUserStatistics(userId: number, topicId?: number): Observable<ExamStatistics> {
        let url = `/dashboard/history/user/${userId}`;

        if (topicId) {
            url += `?topicId=${topicId}`;
        }

        return this.apiService.get(url)
            .pipe(
                tap((userStatistics: UserStatistics) => console.log(userStatistics)),
                map((userStatistics: UserStatistics) => this.calculationsService.calculateExamStatistics(userStatistics.exams))
            );
    }
}

interface UserStatistics {
    exams: Exam[];
}
