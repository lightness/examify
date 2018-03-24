import { Component, OnInit } from "@angular/core";

import { Topic } from "../common/entity/topic.entity";
import { CommonApiService } from "../common/common-api.service";


@Component({
    selector: "ex-public",
    templateUrl: "./public.component.html",
    styleUrls: ["./public.component.css"]
})
export class PublicComponent implements OnInit {

    private topics: Topic[];

    constructor(
        private commonApiService: CommonApiService
    ) {
    }

    public ngOnInit() {
        this.commonApiService.getAllTopics()
            .subscribe((topics: Topic[]) => {
                this.topics = topics;
            });
    }

}
