import { Entity, Column, OneToMany, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";

import { EntityBase } from "../../common/base.entity";
import { User } from "../users/user.entity";
import { Question } from "../question/question.entity";
import { ExamQuestion } from "./exam-question/exam-question.entity";


@Entity()
export class Exam extends EntityBase {

    @ManyToOne(type => User, user => user.exams, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    public user: User;

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
