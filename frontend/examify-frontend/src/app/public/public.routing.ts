import { Routes, RouterModule } from "@angular/router";

import { ExamComponent } from "./exam/exam.component";
import { PublicComponent } from "./public.component";
import { TheoryComponent } from "./theory/theory.component";


const routes: Routes = [
    {
        path: "topic/:topicId/theory",
        component: TheoryComponent
    },
    {
        path: "topic/:topicId/exam",
        component: ExamComponent
    },
    { 
        path: "", 
        component: PublicComponent,
        pathMatch: "full"
    }
];

export const routing = RouterModule.forChild(routes);
