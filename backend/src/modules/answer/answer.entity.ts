import { Column, Entity, ManyToOne, JoinColumn, Index } from "typeorm";

import { Question } from "../question/question.entity";
import { EntityBase } from "../../common/base-entity";


@Entity()
@Index(["question", "text"], { unique: true })
export class Answer extends EntityBase {

    @Column()
    public text: string;

    @Column()
    public isCorrect: boolean;

    @ManyToOne(type => Question, question => question.answers, { onDelete: "CASCADE" })
    @JoinColumn({ name: "questionId" })
    public question: Question;

    @Column({ nullable: false })
    public questionId: number;

}
