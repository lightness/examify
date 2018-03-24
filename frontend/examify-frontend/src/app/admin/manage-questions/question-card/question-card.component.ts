import { Input, Output, Component, EventEmitter } from "@angular/core";

import { Question } from "../../../common/entity/question.entity";


@Component({
    selector: "ex-question-card",
    templateUrl: "./question-card.component.html",
    styleUrls: ["./question-card.component.css"]
})
export class QuestionCardComponent {

    @Input() private question: Question;
    @Output() private onDelete = new EventEmitter<Question>();
    @Output() private onEdit = new EventEmitter<Question>();

    constructor() { }

    public onDeleteClick() {
        this.onDelete.emit(this.question);
    }

    public onEditClick() {
        this.onEdit.emit(this.question);
    }

}
