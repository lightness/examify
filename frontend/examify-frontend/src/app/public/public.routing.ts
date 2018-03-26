import { Routes, RouterModule } from "@angular/router";

import { ExamComponent } from "./exam/exam.component";
import { TopicResolver } from "../common/resolvers/topic.resolver";
import { PublicComponent } from "./public.component";
import { TheoryComponent } from "./theory/theory.component";
import { AllTopicsResolver } from "../common/resolvers/all-topics.resolver";


const routes: Routes = [
    {
        path: "topic/:topicId/theory",
        component: TheoryComponent
    },
    {
        path: "topic/:topicId/exam",
        component: ExamComponent,
        resolve: {
            topic: TopicResolver
        }
    },
    {
        path: "",
        component: PublicComponent,
        resolve: {
            topics: AllTopicsResolver
        },
        pathMatch: "full"
    }
];

export const routing = RouterModule.forChild(routes);
