import * as _ from "lodash";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Topic } from "../../../common/entity/topic.entity";
import { PublicService } from "../public.service";


@Component({
  selector: 'ex-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

    private topicId: number;
    private topic: Topic;
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

    public toggleCheck(questionId: number, answerId: number) {
        let question = _.find(this.topic.questions, { id: questionId });
        let answer = _.find(question.answers, { id: answerId });

        answer.isChecked = !answer.isChecked;
    }

    public startExam() {
        return this.publicService.getExam(this.topicId)
            .subscribe((topic: Topic) => {
                this.topic = topic;
                this.results = null;
            });
    }

    public finish() {
        let result = _.map(this.topic.questions, question => {
            return {
                questionId: question.id,
                answerIds: _(question.answers).filter(answer => answer.isChecked).map(answer => answer.id).value()
            }
        });

        this.publicService.checkExam(result)
            .subscribe(results => {
                this.topic = null;
                this.results = results;
            });
    }

}
