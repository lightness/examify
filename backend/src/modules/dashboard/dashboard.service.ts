import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";

import { Exam } from "../exam/exam.entity";
import { ExamQuestion } from "../exam/exam-question/exam-question.entity";
import { DatabaseService } from "../database/database.service";



@Component()
export class DashboardService {

    public constructor(private databaseService: DatabaseService) {
    }

    public async getExamHistoryForUser(userId: number, topicId?: number): Promise<UserStatistics> {
        let examRepository: Repository<Exam> = this.databaseService.getRepository(Exam);

        let selectQueryBuilder: SelectQueryBuilder<Exam> = examRepository
            .createQueryBuilder("exam")
            .where("exam.user = :userId", { userId });

        if (topicId) {
            selectQueryBuilder = selectQueryBuilder.andWhere("exam.topic = :topicId", { topicId });
        }

        let exams: Exam[] = await selectQueryBuilder
            .andWhere("exam.finishedAt is not null")
            .orderBy("id", "ASC")
            .getMany();

        return { exams };
    }

}

interface UserStatisticsCriteria {
    topicId?: number;
    userId?: number;
}

export interface UserStatistics {
    exams: Exam[];
}
