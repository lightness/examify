import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { Question } from "../../../common/entity/question.entity";
import { AdminService } from "../admin.service";
import { Subject } from "rxjs/Subject";


@Component({
  selector: "ex-manage-questions",
  templateUrl: "./manage-questions.component.html",
  styleUrls: ["./manage-questions.component.css"]
})
export class ManageQuestionsComponent implements OnInit {

    private questions: Question[];

    constructor(
        private adminService: AdminService,
        private route: ActivatedRoute
    ) { }

    public ngOnInit() {
        this.fetchQuestions();
    }

    // public onDelete(topic: Topic) {
    //     this.adminService.deleteTopic(topic.id)
    //         .subscribe(() => {
    //             this.fetchTopics();
    //         });
    // }

    public fetchQuestions() {
        let topicId: number = this.route.snapshot.params["topicId"];

        this.adminService.getQuestionsByTopic(topicId)
            .subscribe((questions: Question[]) => {
                this.questions = questions;
            });

        // this.adminService.getAllTopics()
        //     .subscribe(topics => {
        //         this.questions = topics;
        //     });
    }

}
