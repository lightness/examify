import * as _ from "lodash";
import { map } from "rxjs/operators";
import { Chart } from "chart.js";
import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";

import { Exam } from "../../common/entity/exam.entity";
import { AuthService } from "../../common/auth/auth.service";
import { ExamStatistics, ExamResult, CalculationsService } from "../../common/calculations.service";


@Component({
    selector: "ex-user-statistics",
    templateUrl: "./user-statistics.component.html",
    styleUrls: ["./user-statistics.component.scss"]
})
export class UserStatisticsComponent implements OnInit, OnChanges {

    @Input()
    private exams: Exam[];

    private statistics: ExamStatistics;
    private chart: { type, data, options };
    private chartState: ChartStateItem[] = [];

    public constructor(
        private authService: AuthService,
        private calculationsService: CalculationsService
    ) {
    }

    public ngOnInit() {
        // this.repaintChart();
    }

    public ngOnChanges(changes: SimpleChanges) {
        this.statistics = this.calculationsService.calculateExamStatistics(changes.exams.currentValue);

        this.repaintChart();
    }

    private createChart() {
        let labels = _.map(this.statistics.exams, exam => `Exam #${exam.id}`);

        return {
            type: "bar",
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

    private addMetric(metric: string) {
        this.chartState.push({
            metric,
            color: this.getColor()
        });

        this.repaintChart();
    }

    private deleteMetric(metric: string) {
        this.chartState = _.filter(this.chartState, chartStateItem => chartStateItem.metric !== metric);

        this.repaintChart();
    }

    private repaintChart() {
        this.chart = this.createChart();

        // Apply state
        _.each(this.chartState, chartStateItem => {
            this.addGraph(chartStateItem.metric, chartStateItem.color);
        });
    }

    private addGraph(metricName: string, color: string) {
        let label: string = MEASURE_TITLES[metricName];
        let usedColors: string[] = _.map(this.chart.data.datasets, dataset => dataset.backgroundColor);

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

    private getColor(): string {
        let usedColors: string[] = _.map(this.chartState, (chartStateItem: ChartStateItem) => chartStateItem.color);

        let color: string = _(COLORS)
            .values()
            .difference(usedColors)
            .sample();

        return color;
    }

    private isMetricShown(metric: string): boolean {
        let existingMetricState: ChartStateItem = _.find(this.chartState, chartStateItem => chartStateItem.metric === metric);

        return !!existingMetricState;
    }
}

type MeasureTitleMapping = {[p in keyof ExamResult]?: string };

type ChartStateItem = { metric: string, color: string };

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

