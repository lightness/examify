import { switchMap } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Topic } from "../../../common/entity/topic.entity";
import { Question } from "../../../common/entity/question.entity";
import { CommonApiService } from "../../../common/common-api.service";
import { RoutingService } from "../../../common/routing.service";


@Component({
  selector: "ex-manage-questions",
  templateUrl: "./manage-questions.component.html",
  styleUrls: ["./manage-questions.component.scss"]
})
export class ManageQuestionsComponent implements OnInit {

    private topic: Topic;
    private questions: Question[];

    constructor(
        private commonApiService: CommonApiService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private routingService: RoutingService
    ) { }

    public ngOnInit() {
        this.topic = this.activatedRoute.snapshot.data["topic"];
        this.questions = this.activatedRoute.snapshot.data["questions"];
    }

    private get questionAddPageRoute() {
        return this.routingService.getQuestionAddPage(this.topic.id);
    }

    private get topicEditPageRoute() {
        return this.routingService.getTopicEditPage(this.topic.id);
    }

    private get topicsPageRoute() {
        return this.routingService.getTopicsManagePage();
    }

    public onDelete(question) {
        if (confirm(`Doy you really want to delete question №${question.id}?`)) {
            this.commonApiService.deleteQuestion(question.id)
                .pipe(
                    switchMap(() => this.commonApiService.getQuestionsByTopic(this.topic.id)),
                )
                .subscribe((questions: Question[]) => {
                    this.questions = questions;
                });
        }
    }

    public onEdit(question) {
        let route = this.routingService.getQuestionEditPage(this.topic.id, question.id);

        this.router.navigate(route);
    }

}
