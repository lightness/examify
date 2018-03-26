import { Input, Output, Component, EventEmitter } from "@angular/core";

import { Topic } from "../../../../common/entity/topic.entity";
import { RoutingService } from "../../../../common/routing.service";


@Component({
    selector: "ex-topic-card",
    templateUrl: "./topic-card.component.html",
    styleUrls: ["./topic-card.component.scss"]
})
export class TopicCardComponent {

    @Input() private topic: Topic;
    @Output() private onDelete = new EventEmitter<Topic>();

    public constructor(
        private routingService: RoutingService
    ) {
    }

    private get topicEditPageRoute() {
        return this.routingService.getTopicEditPage(this.topic.id);
    }

    private get questionsManagePageRoute() {
        return this.routingService.getQuestionsManagePage(this.topic.id);
    }

    public onDeleteClick() {
        if (confirm(`Doy you really want to delete topic "${this.topic.title}"?`)) {
            this.onDelete.emit(this.topic);
        }
    }

}
