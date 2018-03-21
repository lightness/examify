import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";

import { Topic } from "../topic/topic.entity";
import { Answer } from "../answer/answer.entity";
import { Question } from "../question/question.entity";
import { DatabaseService } from "../database/database.service";
import { ExamData, ExamResult } from "./exam.types";
import { TopicNotFoundException } from "../topic/topic-not-found.exception";
import { TopicWithoutQuestionsException } from "../topic/topic-without-questions.exception";
import { JwtToken } from "../auth/jwt.token";
import { Exam } from "./exam.entity";
import { User } from "../users/user.entity";


@Component()
export class ExamService {

    private readonly QUESTIONS_IN_TEST = 10; // TODO: move to db settings

    public constructor(private databaseService: DatabaseService) {

    }

    protected get topicRepository(): Repository<Topic> {
        return this.databaseService.getRepository(Topic);
    }

    protected get questionRepository(): Repository<Question> {
        return this.databaseService.getRepository(Question);
    }

    public async startExam(topicId: number, currentJwtToken: JwtToken): Promise<Exam> {
        let currentUser: User = await this.getCurrentUser(currentJwtToken);
        let questions: Question[] = await this.getExamQuestionsByTopic(topicId);

        let exam: Exam = this.createNewExam(questions);

        if (currentUser) {
            exam.user = currentUser;
            return this.persistExam(exam);
        }

        return exam;
    }

    public async checkExam(examData: ExamData): Promise<ExamResult> {
        let answeredExamData: ExamData = _.filter(examData, examDataItem => !!examDataItem.answerIds.length);
        let answeredQuestionIds: number[] = _.map(answeredExamData, examDataItem => examDataItem.questionId);

        let totalQuestionsCount: number = examData.length;
        let answeredQuestionsCount: number = answeredExamData.length;
        let correctlyAnsweredQuestionsCount: number = 0;

        let originalQuestions: Question[] = await this.questionRepository
            .createQueryBuilder("question")
            .leftJoinAndSelect("question.answers", "answer")
            .whereInIds(answeredQuestionIds)
            .getMany();

        _.each(answeredExamData, examDataItem => {
            let originalQuestion: Question = _.find(originalQuestions, q => q.id === examDataItem.questionId);
            let correctAnswerIds: number[] = _(originalQuestion.answers)
                .filter(answer => answer.isCorrect)
                .map(answer => answer.id)
                .value();

            if (_.isEqual(correctAnswerIds.sort(), examDataItem.answerIds.sort())) {
                correctlyAnsweredQuestionsCount++;
            }
        });

        return {
            totalQuestionsCount,
            answeredQuestionsCount,
            correctlyAnsweredQuestionsCount
        };
    }

    private async getExamQuestionsByTopic(topicId: number): Promise<Question[]> {
        let topic: Topic = await this.topicRepository
            .createQueryBuilder("topic")
            .leftJoinAndSelect("topic.questions", "question")
            .leftJoinAndSelect("question.answers", "answer")
            .where(qb => {
                const subQuery = qb.subQuery()
                    .select("q.id")
                    .from(Question, "q")
                    .where("q.topic = :topicId")
                    .orderBy("random()")
                    .limit(this.QUESTIONS_IN_TEST)
                    .getQuery();

                return `question.id in ${subQuery}`;
            })
            .setParameters({ topicId })
            .getOne();

        if (!topic) {
            let existentTopic: Topic = await this.topicRepository
                .createQueryBuilder("topic")
                .where("topic.id = :id", { id: topicId })
                .getOne();

            if (!existentTopic) {
                throw new TopicNotFoundException(topicId);
            } else {
                throw new TopicWithoutQuestionsException(topicId);
            }
        }

        _.each(topic.questions, question => {
            question.answers = _.map(question.answers, answer => _.omit(answer, "isCorrect") as Answer);
        });

        return topic.questions;
    }

    private async getCurrentUser(jwtToken: JwtToken, options?: { repository: Repository<User> }): Promise<User> {
        if (!jwtToken || !jwtToken.user || !jwtToken.user.id) {
            return null;
        }

        let repository: Repository<User> = options && options.repository || this.databaseService.getRepository(User);
        let user: User = await repository.findOneById(jwtToken.user.id);

        return user;
    }

    private createNewExam(questions: Question[]): Exam {
        let exam: Exam = new Exam();
        exam.startedAt = new Date();
        // TODO

        // exam.examQuestions = _.map(questions, question => {
        //     return {
        //         question
        //     };
        // });

        return exam;
    }

    //  examQuestionRepository?: Repository<ExamQuestion>
    private async persistExam(exam: Exam, options?: { examRepository?: Repository<Exam>, }): Promise<Exam> {
        let examRepository: Repository<Exam> = options && options.examRepository || this.databaseService.getRepository(Exam);
        let examQuestionRepository = null; // : Repository<any>

        let persistedExam: Exam = await examRepository.save(exam);

        // await Bluebird.all(exam.)

        return persistedExam;
    }

}
