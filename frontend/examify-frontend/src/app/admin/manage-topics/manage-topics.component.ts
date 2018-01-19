import { Component, OnInit } from '@angular/core';

import { Topic } from "../../../common/entity/topic.entity";
import { AdminService } from "../admin.service";


@Component({
  selector: 'ex-manage-topics',
  templateUrl: './manage-topics.component.html',
  styleUrls: ['./manage-topics.component.css']
})
export class ManageTopicsComponent implements OnInit {

    private topics: Topic[];

    constructor(private adminService: AdminService) { }

    public ngOnInit() {
        this.fetchTopics();
    }

    public delete(topicId: number) {
        this.adminService.deleteTopic(topicId)
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
