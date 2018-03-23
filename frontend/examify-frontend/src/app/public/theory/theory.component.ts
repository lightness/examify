import { mergeMap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { Topic } from "../../../common/entity/topic.entity";
import { PublicService } from "../public.service";


@Component({
    selector: "ex-theory",
    templateUrl: "./theory.component.html",
    styleUrls: ["./theory.component.css"]
})
export class TheoryComponent implements OnInit {

    private topic: Topic;

    constructor(
        private publicService: PublicService,
        private activatedRoute: ActivatedRoute) {
    }

    public ngOnInit() {
        this.activatedRoute.params
            .pipe(
            mergeMap(params => {
                let topicId = +params["topicId"];

                return this.publicService.getTopic(topicId);
            })
            )
            .subscribe((topic: Topic) => {
                this.topic = topic;
            });
    }

}
