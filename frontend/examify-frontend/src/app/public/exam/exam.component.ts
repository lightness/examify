import * as _ from "lodash";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Topic } from "../../common/entity/topic.entity";
import { Exam } from "../../common/entity/exam.entity";
import { Answer } from "../../common/entity/answer.entity";
import { ExamQuestion } from "../../common/entity/exam-question.entity";
import { CalculationsService } from "../../common/calculations.service";
import { CommonApiService } from "../../common/common-api.service";
import { RoutingService } from "../../common/routing.service";


@Component({
    selector: "ex-exam",
    templateUrl: "./exam.component.html",
    styleUrls: ["./exam.component.scss"]
})
export class ExamComponent {

    private topicId: number;
    private exam: Exam;
    private results: any;
    private topic: Topic;
    private examPhase: ExamPhase = ExamPhase.INTRO;

    constructor(
        private commonApiService: CommonApiService,
        private activatedRoute: ActivatedRoute,
        private calculationsService: CalculationsService,
        private routingService: RoutingService
    ) {
        this.topic = this.activatedRoute.snapshot.data["topic"];
        this.topicId = this.activatedRoute.snapshot.params["topicId"];
    }

    private get examSelectPageRoute() {
        return this.routingService.getExamSelectPage();
    }

    private get theoryPageRoute() {
        return this.routingService.getTheoryPage(this.topic.id);
    }

    public startExam() {
        this.commonApiService.startExamByTopic(this.topicId)
            .subscribe((exam: Exam) => {
                this.exam = exam;
                this.examPhase = ExamPhase.EXAM;
            });
    }

    public finishExam() {
        this.commonApiService.checkExam(this.exam)
            .subscribe((verifiedExam: Exam) => {
                this.results = this.calculationsService.calculateExamResult(verifiedExam);
                this.examPhase = ExamPhase.RESULTS;
            });
    }

    public toggleCheck(questionId: number, answerId: number) {
        let examQuestion: ExamQuestion = _.find(this.exam.examQuestions, (exQ: ExamQuestion) => exQ.question.id === questionId);
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

    public isAnswerChecked(questionId: number, answerId: number) {
        let examQuestion: ExamQuestion = _.find(this.exam.examQuestions, (exQ: ExamQuestion) => exQ.question.id === questionId);
        let answer: Answer = _.find(examQuestion.answers, { id: answerId });

        return !!answer;
    }

}

enum ExamPhase {
    INTRO = "intro",
    EXAM = "exam",
    RESULTS = "results"
}
