import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Topic } from "../../../common/entity/topic.entity";
// import { Question } from "../../../common/entity/question.entity";
import { CommonApiService } from "../../../common/common-api.service";
import { RoutingService } from "../../../common/routing.service";


@Component({
    selector: "ex-edit-topic",
    templateUrl: "./edit-topic.component.html",
    styleUrls: ["./edit-topic.component.scss"]
})
export class EditTopicComponent {

    private topic: Topic;

    constructor(
        private commonApiService: CommonApiService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private routingService: RoutingService
    ) {
        this.topic = this.activatedRoute.snapshot.data["topic"] || {};
    }

    private get topicsPageRoute() {
        return this.routingService.getTopicsManagePage();
    }

    private get questionsManagePageRoute() {
        return this.routingService.getQuestionsManagePage(this.topic.id);
    }

    public save() {
        let result;

        if (this.topic.id) {
            result = this.commonApiService.updateTopic({ ...this.topic });
        } else {
            result = this.commonApiService.createTopic(this.topic);
        }

        result.subscribe(newTopic => {
            this.router.navigate(this.topicsPageRoute);
        });
    }

    public deleteTopic() {
        if (confirm(`Do you really want to delete "${this.topic.title}" topic?`)) {
            this.commonApiService.deleteTopic(this.topic.id)
                .subscribe(() => {
                    this.router.navigate(this.topicsPageRoute);
                });
        }
    }

}
