import * as _ from "lodash";
import { Injectable } from "@angular/core";

import { Exam } from "./entity/exam.entity";


@Injectable()
export class CalculationsService {

    public calculateExamResult(exam: Exam): ExamResult {
        return {
            id: exam.id,
            totalQuestionsAmount: exam.totalQuestionsAmount,
            answeredQuestionsAmount: exam.answeredQuestionsAmount,
            answeredQuestionsRatio: exam.answeredQuestionsAmount / exam.totalQuestionsAmount,
            correctlyAnsweredQuestionsAmount: exam.correctlyAnsweredQuestionsAmount,
            correctlyAnsweredQuestionsRatio: exam.correctlyAnsweredQuestionsAmount / exam.totalQuestionsAmount,
            wrongAnsweredQuestionsAmount: exam.answeredQuestionsAmount - exam.correctlyAnsweredQuestionsAmount,
            wrongAnsweredQuestionsRatio: (exam.answeredQuestionsAmount - exam.correctlyAnsweredQuestionsAmount) / exam.totalQuestionsAmount,
            missedQuestionsAmount: exam.totalQuestionsAmount - exam.answeredQuestionsAmount,
            missedQuestionsRatio: (exam.totalQuestionsAmount - exam.answeredQuestionsAmount) / exam.totalQuestionsAmount,
        };
    }

    public calculateExamStatistics(exams: Exam[]): ExamStatistics {
        let examResults: ExamResult[] = _.map(exams, exam => this.calculateExamResult(exam));

        return {
            exams,
            examResults,
            totalQuestionsAmount: this.getStatisticsItem(examResults, "totalQuestionsAmount"),
            answeredQuestionsAmount: this.getStatisticsItem(examResults, "answeredQuestionsAmount"),
            answeredQuestionsRatio: this.getStatisticsItem(examResults, "answeredQuestionsRatio"),
            correctlyAnsweredQuestionsAmount: this.getStatisticsItem(examResults, "correctlyAnsweredQuestionsAmount"),
            correctlyAnsweredQuestionsRatio: this.getStatisticsItem(examResults, "correctlyAnsweredQuestionsRatio"),
            wrongAnsweredQuestionsAmount: this.getStatisticsItem(examResults, "wrongAnsweredQuestionsAmount"),
            wrongAnsweredQuestionsRatio: this.getStatisticsItem(examResults, "wrongAnsweredQuestionsRatio"),
            missedQuestionsAmount: this.getStatisticsItem(examResults, "missedQuestionsAmount"),
            missedQuestionsRatio: this.getStatisticsItem(examResults, "missedQuestionsRatio"),
        };
    }

    private getStatisticsItem(examResults: ExamResult[], property: keyof ExamResult): StatisticsItem {
        let total: number = _.sumBy(examResults, (examResult: ExamResult) => examResult[property]);
        let min: number = _(examResults)
            .map((examResult: ExamResult) => examResult[property])
            .min();
        let max: number = _(examResults)
            .map((examResult: ExamResult) => examResult[property])
            .max();
        let avg: number = examResults.length ? total / examResults.length : 0;

        return { total, min, max, avg };
    }

}

export interface ExamResult {
    id: number;
    totalQuestionsAmount?: number;
    answeredQuestionsAmount?: number;
    answeredQuestionsRatio?: number;
    correctlyAnsweredQuestionsAmount?: number;
    correctlyAnsweredQuestionsRatio?: number;
    wrongAnsweredQuestionsAmount?: number;
    wrongAnsweredQuestionsRatio?: number;
    missedQuestionsAmount?: number;
    missedQuestionsRatio?: number;
}

export interface ExamStatistics extends Statictics<ExamResult> {
    exams: Exam[];
    examResults: ExamResult[];
}

export interface StatisticsItem {
    total: number;
    min: number;
    avg: number;
    max: number;
}

export type Statictics<T> = {
    [P in keyof T]?: StatisticsItem;
};
