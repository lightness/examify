import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChartModule } from "angular2-chartjs";
import { CommonModule } from "@angular/common";

import { routing } from "./dashboard.routing";
import { DashboardService } from "./dashboard.service";
import { UserStatisticsResolver } from "./user-statistics/user-statistics.resolver";
import { UserStatisticsComponent } from "./user-statistics/user-statistics.component";
import { StatisticsHomeComponent } from "./statistics-home/statistics-home.component";
import { UserStatisticsPageComponent } from "./user-statistics-page/user-statistics-page.component";


@NgModule({
    imports: [
        ChartModule,
        CommonModule,
        FormsModule,
        routing
    ],
    declarations: [
        StatisticsHomeComponent,
        UserStatisticsComponent,
        UserStatisticsPageComponent,
    ],
    providers: [
        DashboardService,
        UserStatisticsResolver,
    ]
})
export class DashboardModule { }
