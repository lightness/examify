import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Topic } from "../../../common/entity/topic.entity";
import { Question } from "../../../common/entity/question.entity";
import { CommonApiService } from "../../../common/common-api.service";
import { RoutingService } from "../../../common/routing.service";


@Component({
    selector: "ex-edit-topic",
    templateUrl: "./edit-topic.component.html",
    styleUrls: ["./edit-topic.component.scss"]
})
export class EditTopicComponent implements OnInit {

    private topicId: number;
    private topic: Topic;
    private questions: Question[];

    constructor(
        private commonApiService: CommonApiService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private routingService: RoutingService
    ) { }

    public ngOnInit() {
        this.activatedRoute.params
            .subscribe(params => {
                this.topicId = +params["topicId"];

                this.fetchTopic();
            });
    }

    private get topicsPageRoute() {
        return this.routingService.getTopicsManagePage();
    }

    private get questionsManagePageRoute() {
        return this.routingService.getQuestionsManagePage(this.topicId);
    }

    public fetchTopic() {
        if (this.topicId) {
            this.commonApiService.getTopic(this.topicId)
                .subscribe(topic => {
                    this.topic = topic;
                });
            this.commonApiService.getQuestionsByTopic(this.topicId)
                .subscribe((questions) => {
                    this.questions = questions;
                });
        } else {
            this.topic = {};
            this.questions = [];
        }
    }

    public save() {
        let result;

        if (this.topicId) {
            result = this.commonApiService.updateTopic({ ...this.topic, id: this.topicId });
        } else {
            result = this.commonApiService.createTopic(this.topic);
        }

        result.subscribe(newTopic => {
            this.router.navigate(this.topicsPageRoute);
        });
    }

    public deleteTopic() {
        if (confirm(`Do you really want to delete "${this.topic.title}" topic?`)) {
            this.commonApiService.deleteTopic(this.topicId)
                .subscribe(() => {
                    this.router.navigate(this.topicsPageRoute);
                });
        }
    }

}
