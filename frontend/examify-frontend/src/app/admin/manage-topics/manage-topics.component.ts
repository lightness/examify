import { Component, OnInit } from "@angular/core";

import { Topic } from "../../../common/entity/topic.entity";
import { AdminService } from "../admin.service";
import { Subject } from "rxjs/Subject";


@Component({
  selector: "ex-manage-topics",
  templateUrl: "./manage-topics.component.html",
  styleUrls: ["./manage-topics.component.css"]
})
export class ManageTopicsComponent implements OnInit {

    private topics: Topic[];
    private topicToDelete$ = new Subject<Topic>();

    constructor(private adminService: AdminService) { }

    public ngOnInit() {
        this.fetchTopics();
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
