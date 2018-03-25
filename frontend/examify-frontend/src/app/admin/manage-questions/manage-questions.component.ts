import { switchMap } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Topic } from "../../common/entity/topic.entity";
import { Question } from "../../common/entity/question.entity";
import { CommonApiService } from "../../common/common-api.service";


@Component({
  selector: "ex-manage-questions",
  templateUrl: "./manage-questions.component.html",
  styleUrls: ["./manage-questions.component.scss"]
})
export class ManageQuestionsComponent implements OnInit {

    private topic: Topic;
    private questions: Question[];

    constructor(
        private commonApiService: CommonApiService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    public ngOnInit() {
        this.topic = this.activatedRoute.snapshot.data["topic"];
        this.questions = this.activatedRoute.snapshot.data["questions"];
    }

    public onDelete(question) {
        if (confirm(`Doy you really want to delete question №${question.id}?`)) {
            this.commonApiService.deleteQuestion(question.id)
                .pipe(
                    switchMap(() => this.commonApiService.getQuestionsByTopic(this.topic.id)),
                )
                .subscribe((questions: Question[]) => {
                    this.questions = questions;
                });
        }
    }

    public onEdit(question) {
        this.router.navigate(["/admin", "topic", this.topic.id, "question", question.id]);
    }

}
