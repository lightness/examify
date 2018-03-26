import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { Topic } from "../common/entity/topic.entity";
import { RoutingService } from "../common/routing.service";


@Component({
    selector: "ex-public",
    templateUrl: "./public.component.html",
    styleUrls: ["./public.component.scss"]
})
export class PublicComponent implements OnInit {

    private topics: Topic[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private routingService: RoutingService
    ) {
    }

    public ngOnInit() {
        this.topics = this.activatedRoute.snapshot.data["topics"];
    }

    private getTheoryPageRoute(topicId: number) {
        return this.routingService.getTheoryPage(topicId);
    }

    private getExamPageRoute(topicId: number) {
        return this.routingService.getExamPage(topicId);
    }

}
