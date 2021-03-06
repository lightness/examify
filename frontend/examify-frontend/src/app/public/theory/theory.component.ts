import { mergeMap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { Topic } from "../../common/entity/topic.entity";
import { CommonApiService } from "../../common/common-api.service";
import { RoutingService } from "../../common/routing.service";


@Component({
    selector: "ex-theory",
    templateUrl: "./theory.component.html",
    styleUrls: ["./theory.component.scss"]
})
export class TheoryComponent implements OnInit {

    private topic: Topic;

    constructor(
        private commonApiService: CommonApiService,
        private activatedRoute: ActivatedRoute,
        private routingService: RoutingService
    ) {
    }

    private get examSelectPageRoute() {
        return this.routingService.getExamSelectPage();
    }

    private get examPageRoute() {
        return this.routingService.getExamPage(this.topic.id);
    }

    public ngOnInit() {
        this.activatedRoute.params
            .pipe(
            mergeMap(params => {
                let topicId = +params["topicId"];

                return this.commonApiService.getTopic(topicId);
            })
            )
            .subscribe((topic: Topic) => {
                this.topic = topic;
            });
    }

}
