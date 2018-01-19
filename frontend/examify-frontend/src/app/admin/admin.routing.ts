import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { ManageTopicsComponent } from "./manage-topics/manage-topics.component";
import { EditTopicComponent } from "./edit-topic/edit-topic.component";
import { EditQuestionComponent } from "./edit-question/edit-question.component";


const routes: Routes = [
    {
        path: "topics",
        component: ManageTopicsComponent
    },
    {
        path: "topic/new",
        component: EditTopicComponent
    },
    {
        path: "topic/:topicId",
        component: EditTopicComponent,
        pathMatch: "full"
    },
    {
        path: "topic/:topicId/question/new",
        component: EditQuestionComponent
    },
    {
        path: "topic/:topicId/question/:questionId",
        component: EditQuestionComponent
    },
    { 
        path: "", 
        component: AdminComponent
    }
];

export const routing = RouterModule.forChild(routes);
