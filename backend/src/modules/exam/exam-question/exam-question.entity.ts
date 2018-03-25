import { Entity, JoinColumn, JoinTable, ManyToOne, ManyToMany, Column } from "typeorm";

import { Exam } from "../exam.entity";
import { Answer } from "../../answer/answer.entity";
import { Question } from "../../question/question.entity";
import { EntityBase } from "../../../common/base-entity";


@Entity()
export class ExamQuestion extends EntityBase {

    @ManyToOne(type => Exam, exam => exam.examQuestions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "examId" })
    public exam: Exam;

    @Column({ nullable: false })
    public examId: number;

    @ManyToOne(type => Question, question => question.examQuestions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "questionId" })
    public question: Question;

    @Column({ nullable: false })
    public questionId: number;

    @ManyToMany(type => Answer)
    @JoinTable({ name: "exam_question_answer" })
    public answers: Answer[];

}
