import * as _ from "lodash";
import * as Bluebird from "bluebird";
import { Component, BadRequestException, NotFoundException } from "@nestjs/common";
import { Repository, Transaction, TransactionRepository } from "typeorm";

import { Exam } from "./exam.entity";
import { User } from "../users/user.entity";
import { Topic } from "../topic/topic.entity";
import { Answer } from "../answer/answer.entity";
import { JwtToken } from "../auth/jwt.token";
import { Question } from "../question/question.entity";
import { ExamResult } from "./exam.types";
import { ExamQuestion } from "./exam-question/exam-question.entity";
import { DatabaseService } from "../database/database.service";
import { TopicNotFoundException } from "../topic/topic-not-found.exception";
import { TopicWithoutQuestionsException } from "../topic/topic-without-questions.exception";


@Component()
export class ExamService {

    private readonly QUESTIONS_IN_TEST = 10; // TODO: move to db settings

    public constructor(
        private databaseService: DatabaseService
    ) {
    }

    protected get topicRepository(): Repository<Topic> {
        return this.databaseService.getRepository(Topic);
    }

    protected get questionRepository(): Repository<Question> {
        return this.databaseService.getRepository(Question);
    }

    public async startExam(topicId: number, currentJwtToken: JwtToken): Promise<Exam> {
        let questions: Question[] = await this.getExamQuestionsByTopic(topicId);

        let exam: Exam = this.createNewExam(questions);
        exam.topicId = topicId;

        if (currentJwtToken) {
            exam.userId = currentJwtToken.user.id;

            exam = await this.persistExam(exam);
        }

        // Avoiding circualr JSON structure
        exam.examQuestions = _.map(exam.examQuestions, (examQuestion: ExamQuestion) => {
            return _.omit(examQuestion, "exam") as ExamQuestion;
        });

        return exam;
    }

    @Transaction()
    public async finishExam(
        userExam: Exam,
        currentJwtToken: JwtToken,
        @TransactionRepository(Exam) examRepository?: Repository<Exam>,
        @TransactionRepository(ExamQuestion) examQuestionRepository?: Repository<ExamQuestion>,
    ): Promise<Exam> {
        let currentUser: User = await this.getCurrentUser(currentJwtToken);
        let examResult: Partial<Exam>;

        if (!currentUser) {
            examResult = await this.checkExam(userExam, userExam);

            return examResult as Exam;
        }

        if (!userExam.id) {
            throw new BadRequestException(`Wrong exam id: ${userExam.id}`);
        }

        let originalExam: Exam = await examRepository
            .createQueryBuilder("exam")
            .leftJoinAndSelect("exam.examQuestions", "examQuestion")
            .whereInIds([userExam.id])
            .getOne();

        if (!originalExam) {
            throw new NotFoundException(`Exam with id "${userExam.id}" is not found`);
        }

        if (originalExam.finishedAt) {
            throw new BadRequestException(`Exam with id "${userExam.id}" was already finished`);
        }

        examResult = await this.checkExam(originalExam, userExam);

        userExam.finishedAt = new Date();
        userExam.answeredQuestionsAmount = examResult.answeredQuestionsAmount;
        userExam.correctlyAnsweredQuestionsAmount = examResult.correctlyAnsweredQuestionsAmount;

        await this.persistExam(userExam, { examRepository, examQuestionRepository });

        let persistedExam: Exam = await examRepository.findOneById(userExam.id);

        return persistedExam;
    }

    public async checkExam(originalExam: Exam, userExam: Exam): Promise<Partial<Exam>> {
        let answeredExamQuestions: ExamQuestion[] = _.filter(userExam.examQuestions, (examQuestion: ExamQuestion) => {
            let isExamQuestionWithAnswers: boolean = !_.isEmpty(examQuestion.answers);
            let isExamQuestionFromOriginalExam: boolean = !!_.find(originalExam.examQuestions, originalExamQuestion => originalExamQuestion.questionId === examQuestion.questionId);

            return isExamQuestionFromOriginalExam && isExamQuestionWithAnswers;
        });
        let questionIds: number[] = _.map(answeredExamQuestions, (examQuestion: ExamQuestion) => examQuestion.question.id);

        let originalQuestions: Question[] = await this.questionRepository
            .createQueryBuilder("question")
            .leftJoinAndSelect("question.answers", "answer")
            .whereInIds(questionIds)
            .getMany();

        let correctlyAnsweredQuestionsAmount: number = 0;

        _.each(answeredExamQuestions, (examQuestion: ExamQuestion) => {
            let originalQuestion: Question = _.find(originalQuestions, q => q.id === examQuestion.question.id);
            let correctAnswerIds: number[] = _(originalQuestion.answers)
                .filter(answer => answer.isCorrect)
                .map(answer => answer.id)
                .value();

            let userAnswerIds: number[] = _.map(examQuestion.answers, answer => answer.id);

            if (_.isEqual(correctAnswerIds.sort(), userAnswerIds.sort())) {
                correctlyAnsweredQuestionsAmount++;
            }
        });

        return {
            totalQuestionsAmount: originalExam.examQuestions.length,
            answeredQuestionsAmount: answeredExamQuestions.length,
            correctlyAnsweredQuestionsAmount
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
        exam.totalQuestionsAmount = questions.length;

        exam.examQuestions = _.map(questions, (question: Question) => {
            let examQuestion: ExamQuestion = new ExamQuestion();
            examQuestion.exam = exam;
            examQuestion.question = question;
            examQuestion.questionId = question.id;

            return examQuestion;
        });

        return exam;
    }

    private async persistExam(exam: Exam, options?: { examRepository?: Repository<Exam>, examQuestionRepository?: Repository<ExamQuestion> }): Promise<Exam> {
        let examRepository: Repository<Exam> = options && options.examRepository || this.databaseService.getRepository(Exam);
        let examQuestionRepository: Repository<ExamQuestion> = options && options.examQuestionRepository || this.databaseService.getRepository(ExamQuestion);

        let persistedExam: Exam = await examRepository.save(exam);

        let persistedExamQuestions: ExamQuestion[] = await Bluebird.map(exam.examQuestions, (examQuestion: ExamQuestion) => {
            examQuestion.exam = persistedExam;

            return examQuestionRepository.save(examQuestion);
        });

        persistedExam.examQuestions = persistedExamQuestions;

        return persistedExam;
    }

}
