import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Topic } from "../../../common/entity/topic.entity";
import { Exam } from "../../../common/entity/exam.entity";
import { Answer } from "../../../common/entity/answer.entity";
import { ExamQuestion } from "../../../common/entity/exam-question.entity";
import { PublicService } from "../public.service";
import { CalculationsService } from "../../../common/calculations.service";


@Component({
    selector: "ex-exam",
    templateUrl: "./exam.component.html",
    styleUrls: ["./exam.component.css"]
})
export class ExamComponent implements OnInit {

    private topicId: number;
    private exam: Exam;
    private results: any;
    private topic: Topic;
    private examPhase: ExamPhase;

    constructor(
        private publicService: PublicService,
        private activatedRoute: ActivatedRoute,
        private calculationsService: CalculationsService
    ) {
        this.topic = this.activatedRoute.snapshot.data["topic"];
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
                this.exam = exam;
                this.examPhase = ExamPhase.EXAM;
            });
    }

    public finish() {
        this.publicService.checkExam(this.exam)
            .subscribe((verifiedExam: Exam) => {
                this.results = this.calculationsService.calculateExamResult(verifiedExam);
                this.examPhase = ExamPhase.RESULTS;
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

enum ExamPhase {
    EXAM = "exam",
    RESULTS = "results"
}
