import { Routes, RouterModule } from "@angular/router";

import { TopicResolver } from "../common/resolvers/topic.resolver";
import { QuestionResolver } from "../common/resolvers/question.resolver";
import { AllTopicsResolver } from "../common/resolvers/all-topics.resolver";
import { EditTopicComponent } from "./content-management/edit-topic/edit-topic.component";
import { EditQuestionComponent } from "./content-management/edit-question/edit-question.component";
import { ManageTopicsComponent } from "./content-management/manage-topics/manage-topics.component";
import { ManageQuestionsComponent } from "./content-management/manage-questions/manage-questions.component";
import { QuestionsByTopicResolver } from "../common/resolvers/questions-by-topic.resolver";


const routes: Routes = [
    {
        path: "content-management",
        loadChildren: "./content-management/content-management.module#ContentManagementModule"
    },
    {
        path: "stuff-management",
        loadChildren: "./stuff-management/stuff-management.module#StuffManagementModule"
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/admin/content-management"
    }
];

export const routing = RouterModule.forChild(routes);
