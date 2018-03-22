import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Topic } from "../../../common/entity/topic.entity";
import { PublicService } from "../public.service";
import { Exam } from "../../../common/entity/exam.entity";
import { ExamQuestion } from "../../../common/entity/exam-question.entity";
import { Answer } from "../../../common/entity/answer.entity";


@Component({
    selector: "ex-exam",
    templateUrl: "./exam.component.html",
    styleUrls: ["./exam.component.css"]
})
export class ExamComponent implements OnInit {

    private topicId: number;
    private exam: Exam;
    private results: any;

    constructor(
        private publicService: PublicService,
        private activatedRoute: ActivatedRoute) {
    }

    public ngOnInit() {
        this.activatedRoute.params
            .subscribe(params => {
                this.topicId = +params["topicId"];

                this.startExam();
            });
    }

    public startExam() {
        return this.publicService.startExamByTopic(this.topicId)
            .subscribe((exam: Exam) => {
                console.log(">>> Exam", exam);

                this.exam = exam;
                this.results = null;
            });
    }

    public finish() {
        let result = _.map(this.topic.questions, question => {
            return {
                questionId: question.id,
                answerIds: _(question.answers).filter(answer => answer.isChecked).map(answer => answer.id).value()
            };
        });

        this.publicService.checkExam(result)
            .subscribe(results => {
                this.exam = null;
                this.results = results;
            });
    }

    public toggleCheck(examQuestionId: number, answerId: number) {
        let examQuestion: ExamQuestion = _.find(this.exam.examQuestions, { id: examQuestionId });
        let answer: Answer = _.find(examQuestion.answers, { id: answerId });

        if (answer) {
            _.remove(examQuestion.answers, { id: answerId });
        } else {
            if (!examQuestion.answers) {
                examQuestion.answers = [];
            }

            examQuestion.answers.push({ id: answerId });
        }
    }

    public isAnswerChecked(examQuestionId: number, answerId: number) {
        let examQuestion: ExamQuestion = _.find(this.exam.examQuestions, { id: examQuestionId });
        let answer: Answer = _.find(examQuestion.answers, { id: answerId });

        return !!answer;
    }

}
