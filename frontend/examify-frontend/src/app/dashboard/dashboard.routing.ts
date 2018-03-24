import { Routes, RouterModule } from "@angular/router";

import { UserStatisticsResolver } from "./user-statistics/user-statistics.resolver";
import { StatisticsHomeComponent } from "./statistics-home/statistics-home.component";
import { UserStatisticsPageComponent } from "./user-statistics-page/user-statistics-page.component";


const routes: Routes = [
    {
        path: "statistics/user/:userId",
        component: UserStatisticsPageComponent,
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
