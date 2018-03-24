import * as _ from "lodash";
import { map } from "rxjs/operators";
import { Chart } from "chart.js";
import { Component, OnInit, Input } from "@angular/core";

import { Exam } from "../../common/entity/exam.entity";
import { AuthService } from "../../common/auth/auth.service";
import { ExamStatistics, ExamResult } from "../../common/calculations.service";


@Component({
    selector: "ex-user-statistics",
    templateUrl: "./user-statistics.component.html",
    styleUrls: ["./user-statistics.component.css"]
})
export class UserStatisticsComponent implements OnInit {

    @Input()
    private userId: number;

    @Input()
    private topicId: number;

    @Input()
    private statistics: ExamStatistics;

    private chart: { type, data, options };

    public constructor(
        private authService: AuthService
    ) {
    }

    public ngOnInit() {
        this.chart = this.createChart();
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
        let label: string = MEASURE_TITLES[metricName];
        this.chart.data = {
            ...this.chart.data,
            datasets: _.filter(this.chart.data.datasets, dataset => dataset.label !== label)
        };
    }

    private addChart(metricName: string) {
        let label: string = MEASURE_TITLES[metricName];
        let usedColors: string[] = _.map(this.chart.data.datasets, dataset => dataset.backgroundColor);
        let color: string = _(COLORS)
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
        let label: string = MEASURE_TITLES[metricName];
        let existingDataset: Object = _.find(this.chart.data.datasets, { label });

        return !!existingDataset;
    }
}

type MeasureTitleMapping = {[p in keyof ExamResult]?: string };

const COLORS = {
    BLUE: "rgb(54, 162, 235)",
    GREEN: "rgb(75, 192, 192)",
    ORANGE: "rgb(255, 159, 64)",
    PURPLE: "rgb(153, 102, 255)",
    RED: "rgb(255, 99, 132)",
    YELLOW: "rgb(255, 205, 86)",
};

const MEASURE_TITLES: MeasureTitleMapping = {
    totalQuestionsAmount: "Total Questions Amount",
    answeredQuestionsAmount: "Answered Questions Amount",
    correctlyAnsweredQuestionsAmount: "Correctly Answered Questions Amount",
    wrongAnsweredQuestionsAmount: "Wrong Answered Questions Amount",
    missedQuestionsAmount: "Missed Questions Amount",
};
