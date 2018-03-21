import { Entity, JoinColumn, JoinTable, ManyToOne, ManyToMany } from "typeorm";

import { Exam } from "../exam.entity";
import { Question } from "../../question/question.entity";
import { EntityBase } from "../../../common/base.entity";
import { Answer } from "../../answer/answer.entity";


@Entity()
export class ExamQuestion extends EntityBase {

    @ManyToOne(type => Exam, exam => exam.examQuestions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "examId" })
    public exam: Exam;

    @ManyToOne(type => Question, question => question.examQuestions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "questionId" })
    public question: Question;

    @ManyToMany(type => Answer)
    @JoinTable({ name: "exam_question_answer" })
    public anwers: Answer[];

}
