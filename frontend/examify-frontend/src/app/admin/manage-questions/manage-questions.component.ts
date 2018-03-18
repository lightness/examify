import { switchMap } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Topic } from "../../../common/entity/topic.entity";
import { Question } from "../../../common/entity/question.entity";
import { AdminService } from "../admin.service";


@Component({
  selector: "ex-manage-questions",
  templateUrl: "./manage-questions.component.html",
  styleUrls: ["./manage-questions.component.css"]
})
export class ManageQuestionsComponent implements OnInit {

    private topic: Topic;
    private questions: Question[];

    constructor(
        private adminService: AdminService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    public ngOnInit() {
        this.topic = this.activatedRoute.snapshot.data["topic"];
        this.questions = this.activatedRoute.snapshot.data["questions"];
    }

    public onDelete(question) {
        if (confirm(`Doy you really want to delete question №${question.id}?`)) {
            this.adminService.deleteQuestion(question.id)
                .pipe(
                    switchMap(() => this.adminService.getQuestionsByTopic(this.topic.id)),
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
