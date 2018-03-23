import * as _ from "lodash";
import { map } from "rxjs/operators";
import { Chart } from "chart.js";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { ExamStatistics, ExamResult } from "../../../common/calculations.service";
import { AuthService } from "../../../common/auth/auth.service";


@Component({
    selector: "ex-user-statistics",
    templateUrl: "./user-statistics.component.html",
    styleUrls: ["./user-statistics.component.css"]
})
export class UserStatisticsComponent implements OnInit {

    private COLORS = {
        BLUE: "rgb(54, 162, 235)",
        GREEN: "rgb(75, 192, 192)",
        ORANGE: "rgb(255, 159, 64)",
        PURPLE: "rgb(153, 102, 255)",
        RED: "rgb(255, 99, 132)",
        YELLOW: "rgb(255, 205, 86)",
    };

    private MEASURE_TITLES: MeasureTitleMapping = {
        totalQuestionsAmount: "Total Questions Amount",
        answeredQuestionsAmount: "Answered Questions Amount",
        correctlyAnsweredQuestionsAmount: "Correctly Answered Questions Amount",
        wrongAnsweredQuestionsAmount: "Wrong Answered Questions Amount",
        missedQuestionsAmount: "Missed Questions Amount",
    };

    private statistics: ExamStatistics;
    private chart: { type, data, options };
    private userId: number;
    private isStatisticsMine: boolean;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService
    ) {
        this.statistics = this.activatedRoute.snapshot.data["statistics"];
        this.userId = +this.activatedRoute.snapshot.params["userId"];
    }

    public ngOnInit() {
        this.chart = this.createChart();
        this.authService.currentUser
            .pipe(
                map(currentUser => currentUser.id)
            )
            .subscribe((currentUserId: number) => {
                this.isStatisticsMine = (this.userId === currentUserId);
            });
    }

    private createChart() {
        let labels = _.map(this.statistics.exams, exam => `Exam #${exam.id}`);

        return {
            type: "line",
            data: {
                labels,
                datasets: []
            },
            options: {
                responsove: true,
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };
    }

    private deleteChart(metricName: string) {
        let label: string = this.MEASURE_TITLES[metricName];
        this.chart.data = {
            ...this.chart.data,
            datasets: _.filter(this.chart.data.datasets, dataset => dataset.label !== label)
        };
    }

    private addChart(metricName: string) {
        let label: string = this.MEASURE_TITLES[metricName];
        let usedColors: string[] = _.map(this.chart.data.datasets, dataset => dataset.backgroundColor);
        let color: string = _(this.COLORS)
            .values()
            .difference(usedColors)
            .sample();
        let data: number[] = _.map(this.statistics.examResults, examResult => examResult[metricName]);

        this.chart.data = {
            ...this.chart.data,
            datasets: [
                ...this.chart.data.datasets,
                {
                    label,
                    data,
                    backgroundColor: color,
                    borderColor: color,
                    fill: false
                }
            ]
        };
    }

    private isMetricShown(metricName: string): boolean {
        let label: string = this.MEASURE_TITLES[metricName];
        let existingDataset: Object = _.find(this.chart.data.datasets, { label });

        return !!existingDataset;
    }
}

type MeasureTitleMapping = {[p in keyof ExamResult]?: string };
