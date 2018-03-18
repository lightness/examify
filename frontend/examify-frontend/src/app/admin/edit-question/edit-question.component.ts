import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Topic } from "../../../common/entity/topic.entity";
import { Question } from "../../../common/entity/question.entity";
import { AdminService } from "../admin.service";
import { Answer } from "../../../common/entity/answer.entity";


@Component({
    selector: "ex-edit-question",
    templateUrl: "./edit-question.component.html",
    styleUrls: ["./edit-question.component.css"]
})
export class EditQuestionComponent implements OnInit {

    private topic: Topic;
    private question: Question;

    constructor(
        private adminService: AdminService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    public ngOnInit() {
        this.question = this.activatedRoute.snapshot.data["question"] || {};
        this.topic = this.activatedRoute.snapshot.data["topic"];
    }

    public save() {
        let result;

        if (this.question.id) {
            result = this.adminService.updateQuestion({ ...this.question, id: this.question.id });
        } else {
            result = this.adminService.createQuestion({ ...this.question, topicId: this.topic.id });
        }

        result.subscribe(newTopic => {
            this.router.navigate(["/admin", "topic", this.topic.id, "questions"]);
        });
    }

    public deleteQuestion() {
        if (confirm(`Do you really want to remove this question?`)) {
            this.adminService.deleteQuestion(this.question.id)
                .subscribe(() => {
                    this.router.navigate(["/admin", "topic", this.topic.id, "questions"]);
                });
        }
    }

    public deleteAnswer(answer: Answer) {
        _.remove(this.question.answers, answer);
    }

    public addAnswer() {
        if (!this.question.answers) {
            this.question.answers = [];
        }

        this.question.answers.push({ text: "", isCorrect: false });
    }

}
