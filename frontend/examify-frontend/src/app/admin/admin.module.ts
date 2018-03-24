import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { routing } from "./admin.routing";
import { AdminComponent } from "./admin.component";
import { EditTopicComponent } from "./edit-topic/edit-topic.component";
import { TopicCardComponent } from "./manage-topics/topic-card/topic-card.component";
import { EditQuestionComponent } from "./edit-question/edit-question.component";
import { ManageTopicsComponent } from "./manage-topics/manage-topics.component";
import { ManageQuestionsComponent } from "./manage-questions/manage-questions.component";
import { QuestionCardComponent } from "./manage-questions/question-card/question-card.component";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing
    ],
    declarations: [
        AdminComponent,
        TopicCardComponent,
        QuestionCardComponent,
        ManageTopicsComponent,
        ManageQuestionsComponent,
        EditTopicComponent,
        EditQuestionComponent,
    ],
    providers: []
})
export class AdminModule { }
