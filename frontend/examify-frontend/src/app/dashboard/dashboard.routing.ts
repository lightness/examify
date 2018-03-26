import { Routes, RouterModule } from "@angular/router";

import { TopicResolver } from "../common/resolvers/topic.resolver";
import { AllUsersResolver } from "../common/resolvers/all-users.resolver";
import { ExamsHistoryResolver } from "./exams-history.resolver";
import { StatisticsHomeComponent } from "./statistics-home/statistics-home.component";
import { UserStatisticsPageComponent } from "./user-statistics-page/user-statistics-page.component";


const routes: Routes = [
    {
        path: "statistics/user/:userId",
        component: UserStatisticsPageComponent,
        resolve: {
            examsHistory: ExamsHistoryResolver,
            topic: TopicResolver
        },
    },
    {
        path: "statistics",
        component: StatisticsHomeComponent,
        pathMatch: "full",
        resolve: {
            allUsers: AllUsersResolver
        }
    }
];

export const routing = RouterModule.forChild(routes);
