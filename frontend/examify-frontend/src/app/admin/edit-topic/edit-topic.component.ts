import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Topic } from "../../../common/entity/topic.entity";
import { Question } from "../../../common/entity/question.entity";
import { AdminService } from "../admin.service";


@Component({
  selector: "ex-edit-topic",
  templateUrl: "./edit-topic.component.html",
  styleUrls: ["./edit-topic.component.css"]
})
export class EditTopicComponent implements OnInit {

    private topicId: number;
    private topic: Topic;
    private questions: Question[];

    constructor(
        private adminService: AdminService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    public ngOnInit() {
        this.activatedRoute.params
            .subscribe(params => {
                this.topicId = +params["topicId"];

                this.fetchTopic();
            });
    }

    public fetchTopic() {
        if (this.topicId) {
            this.adminService.getTopic(this.topicId)
                .subscribe(topic => {
                    this.topic = topic;
                });
            this.adminService.getQuestionsByTopic(this.topicId)
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
            result = this.adminService.updateTopic({...this.topic, id: this.topicId });
        } else {
            result = this.adminService.createTopic(this.topic);
        }

        result.subscribe(newTopic => {
            this.router.navigate(["/admin", "topics"]);
        });
    }

    public deleteQuestion(questionId: number) {
        this.adminService.deleteQuestion(questionId)
            .subscribe(() => {
                this.fetchTopic();
            });
    }

    public deleteTopic() {
        this.adminService.deleteTopic(this.topicId)
            .subscribe(() => {
                this.router.navigate(["/admin", "topics"]);
            });
    }

}
