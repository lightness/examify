import { Routes, RouterModule } from "@angular/router";

import { UserStatisticsResolver } from "./user-statistics/user-statistics.resolver";
import { UserStatisticsComponent } from "./user-statistics/user-statistics.component";
import { StatisticsHomeComponent } from "./statistics-home/statistics-home.component";


const routes: Routes = [
    {
        path: "statistics/user/:userId",
        component: UserStatisticsComponent,
        resolve: {
            statistics: UserStatisticsResolver
        },
    },
    {
        path: "statistics",
        component: StatisticsHomeComponent,
        pathMatch: "full"
    }
];

export const routing = RouterModule.forChild(routes);
