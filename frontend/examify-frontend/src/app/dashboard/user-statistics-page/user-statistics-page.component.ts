import * as _ from "lodash";
import { Location } from "@angular/common";
import { map, filter } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Exam } from "../../common/entity/exam.entity";
import { Topic } from "../../common/entity/topic.entity";
import { AuthService } from "../../common/auth/auth.service";
import { CommonApiService } from "../../common/common-api.service";


@Component({
    selector: "ex-user-statistics-page",
    templateUrl: "./user-statistics-page.component.html",
    styleUrls: ["./user-statistics-page.component.css"]
})
export class UserStatisticsPageComponent implements OnInit {

    private topic: Topic;
    private userId: number;
    private topicId: number;
    private allTopics: Topic[];
    private examsHistory: Exam[];
    private relevantExams: Exam[];
    private isStatisticsMine: boolean;
    private topicsWithFinishedExamsCount: number;
    private examsCounts: { [topicId: string]: number } = {};

    public constructor(
        private location: Location,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private commonApiService: CommonApiService,
    ) {
        this.examsHistory = this.activatedRoute.snapshot.data["examsHistory"];
        this.userId = +this.activatedRoute.snapshot.params["userId"];
        this.topicId = +this.activatedRoute.snapshot.queryParams["topicId"];
        this.topic = this.activatedRoute.snapshot.data["topic"];
    }

    public ngOnInit() {
        this.recalculateStatistics();

        this.examsCounts = _.countBy(this.examsHistory, exam => exam.topicId);

        this.topicsWithFinishedExamsCount = _(this.examsHistory)
            .map((exam: Exam) => exam.topicId)
            .uniq()
            .value()
            .length;

        this.commonApiService.getAllTopics()
            .subscribe((topics: Topic[]) => {
                this.allTopics = topics;
            });

        this.authService.currentUser
            .pipe(
            filter(currentUser => !!currentUser),
            map(currentUser => currentUser.id)
            )
            .subscribe((currentUserId: number) => {
                this.isStatisticsMine = (this.userId === currentUserId);
            });
    }

    private setTopicId(topicId: number) {
        this.topicId = topicId;
        this.topic = _.find(this.allTopics, { id: topicId });
        this.recalculateStatistics();
        this.overrideUrl(topicId);
    }

    private recalculateStatistics() {
        let criteria = this.getCriteria();
        this.relevantExams = _.filter(this.examsHistory, criteria);
    }

    private getCriteria() {
        let criteria: { userId: number, topicId?: number } = {
            userId: this.userId
        };

        if (this.topicId) {
            criteria.topicId = this.topicId;
        }

        return criteria;
    }

    private overrideUrl(topicId: number) {
        let url: string = this.router.url.split("?")[0];

        if (topicId) {
            this.location.replaceState(url, `?topicId=${topicId}`);
        } else {
            this.location.replaceState(url);
        }
    }
}
