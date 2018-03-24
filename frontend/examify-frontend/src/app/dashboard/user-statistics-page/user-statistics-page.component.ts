import * as _ from "lodash";
import { map } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { ExamStatistics } from "../../../common/calculations.service";
import { Exam } from "../../../common/entity/exam.entity";
import { AuthService } from "../../../common/auth/auth.service";


@Component({
    selector: "ex-user-statistics-page",
    templateUrl: "./user-statistics-page.component.html",
    styleUrls: ["./user-statistics-page.component.css"]
})
export class UserStatisticsPageComponent implements OnInit {

    private topicId: number;
    private userId: number;
    private statistics: ExamStatistics;

    private isStatisticsMine: boolean;
    private topicIds: number[];

    public constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService
    ) {
        this.statistics = this.activatedRoute.snapshot.data["statistics"];
        this.userId = +this.activatedRoute.snapshot.params["userId"];
        this.topicId = this.activatedRoute.snapshot.queryParams["topicId"]
            ? +this.activatedRoute.snapshot.queryParams["topicId"]
            : null;
    }

    public ngOnInit() {
        this.topicIds = _(this.statistics.exams)
            .map((exam: Exam) => exam.topicId)
            .uniq()
            .value();

        this.authService.currentUser
            .pipe(map(currentUser => currentUser.id))
            .subscribe((currentUserId: number) => {
                this.isStatisticsMine = (this.userId === currentUserId);
            });
    }

}
