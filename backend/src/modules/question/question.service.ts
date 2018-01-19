import * as _ from "lodash";
import * as Bluebird from "bluebird";
import { Component } from "@nestjs/common";
import { Repository, Transaction, TransactionRepository } from "typeorm";

import { Answer } from "../answer/answer.entity";
import { Service } from "../../common/service.interface";
import { Question } from "./question.entity";
import { ServiceBase } from "../../common/base.service";
import { AnswerService } from "../answer/answer.service";
import { DatabaseService } from "../database/database.service";
import { QuestionAlreadyExistsException } from "./question.already-exists.exception";


@Component()
export class QuestionService extends ServiceBase<Question> implements Service<Question> {

    constructor(
        private databaseService: DatabaseService,
        private answerService: AnswerService) {
        super();
    }

    protected get repository(): Repository<Question> {
        return this.databaseService.getRepository(Question);
    }

    public async add(question: Question): Promise<Question> {
        try {
            return await super.add(question);
        }
        catch (e) {
            throw new QuestionAlreadyExistsException(question);
        }
    }

    public async createWithAnswers(question: Question): Promise<Question> {
        let createdQuestion: Question = await this.add(question);

        createdQuestion.answers = await Bluebird.map(question.answers, answer => {
            answer = _.extend(answer, { questionId: createdQuestion.id });

            return this.answerService.add(answer);
        });

        return createdQuestion;
    }

    public async updateWithAnswers(question: Question): Promise<Question> {
        let questionWithoutAnswers: Question = _.omit(question, "answers") as Question;
        let updatedQuestion: Question = await this.update(questionWithoutAnswers);

        console.log(">>>", updatedQuestion);

        updatedQuestion.answers = await Bluebird.map(question.answers, answer => {
            answer = _.extend(answer, { questionId: updatedQuestion.id });

            return this.answerService.update(answer);
        });

        return updatedQuestion;
    }

    public async getByTopicId(topicId: number): Promise<Question[]> {
        let questions: Question[] = await this.repository.createQueryBuilder("question")
            .leftJoinAndSelect("question.answers", "answer")
            .where("question.topicId = :topicId", { topicId })
            .getMany();

        return questions;
    }

}
