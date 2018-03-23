import { Column, Entity, OneToMany } from "typeorm";

import { Question } from "../question/question.entity";
import { EntityBase } from "../../common/base-entity";
import { Exam } from "../exam/exam.entity";


@Entity()
export class Topic extends EntityBase {

    @Column({ unique: true })
    public title: string;

    @Column()
    public theory: string;

    @OneToMany(type => Question, question => question.topic)
    public questions: Question[];

    @OneToMany(type => Exam, exam => exam.topic)
    public exams: Exam[];

}
