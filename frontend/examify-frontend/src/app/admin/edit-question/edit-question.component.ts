import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Topic } from "../../../common/entity/topic.entity";
import { Question } from "../../../common/entity/question.entity";
import { AdminService } from "../admin.service";


@Component({
    selector: "ex-edit-question",
    templateUrl: "./edit-question.component.html",
    styleUrls: ["./edit-question.component.css"]
})
export class EditQuestionComponent implements OnInit {

    private topicId: number;
    private questionId: number;
    private question: Question;

    constructor(
        private adminService: AdminService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    public ngOnInit() {
        this.activatedRoute.params
            .subscribe(params => {
                this.topicId = +params["topicId"];
                this.questionId = +params["questionId"];

                this.fetchQuestion();
            });
    }

    public fetchQuestion() {
        if (this.questionId) {
            this.adminService.getQuestion(this.questionId)
                .subscribe(question => {
                    this.question = question;
                });
        } else {
            this.question = {};
        }
    }

    public save() {
        let result;

        if (this.questionId) {
            result = this.adminService.updateQuestion({ ...this.question, id: this.questionId });
        } else {
            result = this.adminService.createQuestion({ ...this.question, topicId: this.topicId });
        }

        result.subscribe(newTopic => {
            this.router.navigate(["/admin", "topic", this.topicId, "questions"]);
        });
    }

    public deleteQuestion() {
        this.adminService.deleteQuestion(this.questionId)
            .subscribe(() => {
                this.router.navigate(["/admin", "topic", this.topicId, "questions"]);
            });
    }

    public deleteAnswer(answerId: number) {
        _.remove(this.question.answers, { id: answerId });
    }

    public addAnswer() {
        if (!this.question.answers) {
            this.question.answers = [];
        }

        this.question.answers.push({ text: "", isCorrect: false });
    }

}
