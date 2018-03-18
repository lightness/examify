import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { EditTopicComponent } from "./edit-topic/edit-topic.component";
import { EditQuestionComponent } from "./edit-question/edit-question.component";
import { ManageTopicsComponent } from "./manage-topics/manage-topics.component";
import { ManageQuestionsComponent } from "./manage-questions/manage-questions.component";
import { AllTopicsResolver } from "./common/all-topics.resolver";
import { TopicResolver } from "./common/topic.resolver";
import { QuestionsByTopicResolver } from "./common/questions-by-topic.resolver";
import { QuestionResolver } from "./common/question.resolver";


const routes: Routes = [
    {
        path: "topics",
        component: ManageTopicsComponent,
        resolve: {
            topics: AllTopicsResolver
        }
    },
    {
        path: "topic/new",
        component: EditTopicComponent
    },
    {
        path: "topic/:topicId",
        component: EditTopicComponent,
        pathMatch: "full",
        resolve: {
            topic: TopicResolver
        }
    },
    {
        path: "topic/:topicId/questions",
        component: ManageQuestionsComponent,
        resolve: {
            topic: TopicResolver,
            questions: QuestionsByTopicResolver
        }
    },
    {
        path: "topic/:topicId/question/new",
        component: EditQuestionComponent,
        resolve: {
            topic: TopicResolver
        }
    },
    {
        path: "topic/:topicId/question/:questionId",
        component: EditQuestionComponent,
        resolve: {
            topic: TopicResolver,
            question: QuestionResolver
        }
    },
    {
        path: "",
        component: AdminComponent
    }
];

export const routing = RouterModule.forChild(routes);
