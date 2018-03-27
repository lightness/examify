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
import { AnswerRepository } from "../answer/answer.repository";
import { QuestionRepository } from "./question.repository";
import { QuestionAlreadyExistsException } from "./question.already-exists.exception";


@Component()
export class QuestionService extends ServiceBase<Question> implements Service<Question> {

    constructor(
        private databaseService: DatabaseService,
        private answerService: AnswerService) {
        super();
    }

    protected get repository(): QuestionRepository {
        return this.databaseService.getCustomRepository(QuestionRepository);
    }

    public async getById(id: number, options?: { repository: QuestionRepository }): Promise<Question> {
        let repository = options && options.repository || this.repository;

        let question: Question = await repository.createQueryBuilder("question")
            .leftJoinAndSelect("question.answers", "answer", "answer.questionId = question.id")
            .where("question.id = :id", { id })
            .getOne();

        return question;
    }

    @Transaction()
    public async createWithAnswers(
        question: Question,
        @TransactionRepository() questionRepository: QuestionRepository,
        @TransactionRepository() answerRepository: AnswerRepository
    ): Promise<Question> {
        let createdQuestion: Question = await questionRepository.saveQuestion(question);

        if (question.answers) {
            createdQuestion.answers = await Bluebird.map(question.answers, answer => {
                answer = _.extend(answer, { questionId: createdQuestion.id });

                return answerRepository.saveAnswer(answer);
            });
        }

        return createdQuestion;
    }

    @Transaction()
    public async updateWithAnswers(
        question: Question,
        @TransactionRepository() questionRepository: QuestionRepository,
        @TransactionRepository() answerRepository: AnswerRepository
    ): Promise<Question> {
        let questionWithoutAnswers: Partial<Question> = _.omit(question, "answers");
        await questionRepository.updateById(question.id, questionWithoutAnswers);

        let existingQuestion: Question = await this.getById(question.id, { repository: questionRepository });

        let answersToDelete: Answer[] = _.differenceWith(existingQuestion.answers, question.answers, (existingAnswer: Answer, newAnswer: Answer) => {
            return existingAnswer.id === newAnswer.id;
        });

        await Bluebird.map(answersToDelete, (answer: Answer) => {
            return answerRepository.deleteById(answer.id);
        });

        let answers = await Bluebird.map(question.answers, answer => {
            answer = _.extend(answer, { questionId: question.id });

            return answerRepository.saveAnswer(answer);
        });

        return this.getById(question.id, { repository: questionRepository });
    }

    public async getByTopicId(topicId: number): Promise<Question[]> {
        let questions: Question[] = await this.repository.createQueryBuilder("question")
            .leftJoinAndSelect("question.answers", "answer")
            .where("question.topicId = :topicId", { topicId })
            .getMany();

        return questions;
    }

}
