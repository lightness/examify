import { Input, Output, Component, EventEmitter } from "@angular/core";

import { Topic } from "../../../common/entity/topic.entity";


@Component({
    selector: "ex-topic-card",
    templateUrl: "./topic-card.component.html",
    styleUrls: ["./topic-card.component.css"]
})
export class TopicCardComponent {

    @Input() private topic: Topic;
    @Output() private onDelete = new EventEmitter<Topic>();

    constructor() { }

    public onDeleteClick() {
        if (confirm(`Doy you really want to delete topic "${this.topic.title}"?`)) {
            this.onDelete.emit(this.topic);
        }
    }

}
