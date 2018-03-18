import { Subject } from "rxjs/Subject";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { Topic } from "../../../common/entity/topic.entity";
import { AdminService } from "../admin.service";


@Component({
    selector: "ex-manage-topics",
    templateUrl: "./manage-topics.component.html",
    styleUrls: ["./manage-topics.component.css"]
})
export class ManageTopicsComponent implements OnInit {

    private topics: Topic[];

    constructor(
        private router: Router,
        private adminService: AdminService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    public ngOnInit() {
        this.topics = this.activatedRoute.snapshot.data["topics"];
    }

    public onDelete(topic: Topic) {
        this.adminService.deleteTopic(topic.id)
            .subscribe(() => {
                this.fetchTopics();
            });
    }

    public fetchTopics() {
        this.adminService.getAllTopics()
            .subscribe(topics => {
                this.topics = topics;
            });
    }

}
