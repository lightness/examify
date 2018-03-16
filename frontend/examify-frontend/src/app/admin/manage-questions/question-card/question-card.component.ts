import { Input, Output, Component, EventEmitter } from "@angular/core";

import { Question } from "../../../../common/entity/question.entity";


@Component({
    selector: "ex-question-card",
    templateUrl: "./question-card.component.html",
    styleUrls: ["./question-card.component.css"]
})
export class QuestionCardComponent {

    @Input() private question: Question;
    @Output() private onDelete = new EventEmitter<Question>();

    constructor() { }

    public onDeleteClick() {
        if (confirm(`Doy you really want to delete question №${this.question.id}?`)) {
            this.onDelete.emit(this.question);
        }
    }

}
