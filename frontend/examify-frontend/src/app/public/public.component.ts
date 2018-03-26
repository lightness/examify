import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { Topic } from "../common/entity/topic.entity";


@Component({
    selector: "ex-public",
    templateUrl: "./public.component.html",
    styleUrls: ["./public.component.scss"]
})
export class PublicComponent implements OnInit {

    private topics: Topic[];

    constructor(
        private activatedRoute: ActivatedRoute
    ) {
    }

    public ngOnInit() {
        this.topics = this.activatedRoute.snapshot.data["topics"];
    }

}
