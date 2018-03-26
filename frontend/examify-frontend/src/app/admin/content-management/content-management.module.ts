import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { routing } from "./content-management.routing";
import { EditTopicComponent } from "./edit-topic/edit-topic.component";
import { TopicCardComponent } from "./manage-topics/topic-card/topic-card.component";
import { EditQuestionComponent } from "./edit-question/edit-question.component";
import { ManageTopicsComponent } from "./manage-topics/manage-topics.component";
import { QuestionCardComponent } from "./manage-questions/question-card/question-card.component";
import { ManageQuestionsComponent } from "./manage-questions/manage-questions.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing
    ],
    declarations: [
        TopicCardComponent,
        QuestionCardComponent,
        ManageTopicsComponent,
        ManageQuestionsComponent,
        EditTopicComponent,
        EditQuestionComponent,
    ],
    providers: []
})
export class ContentManagementModule { }
