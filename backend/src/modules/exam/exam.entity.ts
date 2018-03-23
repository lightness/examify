import { Entity, Column, OneToMany, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";

import { User } from "../users/user.entity";
import { Question } from "../question/question.entity";
import { EntityBase } from "../../common/base-entity";
import { ExamQuestion } from "./exam-question/exam-question.entity";
import { Topic } from "../topic/topic.entity";


@Entity()
export class Exam extends EntityBase {

    @ManyToOne(type => User, user => user.exams, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    public user: User;

    @ManyToOne(type => Topic, topic => topic.exams, { onDelete: "CASCADE" })
    @JoinColumn({ name: "topicId" })
    public topic: Topic;

    @OneToMany(type => ExamQuestion, examQuestion => examQuestion.exam)
    public examQuestions: ExamQuestion[];

    @Column({ type: "timestamp" })
    public startedAt: Date;

    @Column({ type: "timestamp", nullable: true })
    public finishedAt: Date;

    @Column()
    public totalQuestionsAmount: number;

    @Column({ nullable: true })
    public answeredQuestionsAmount: number;

    @Column({ nullable: true })
    public correctlyAnsweredQuestionsAmount: number;

}
