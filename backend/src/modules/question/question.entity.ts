import { Column, Entity, OneToMany, ManyToOne, JoinColumn, Index } from "typeorm";

import { Topic } from "../topic/topic.entity";
import { Answer } from "../answer/answer.entity";
import { EntityBase } from "../../common/base-entity";
import { ExamQuestion } from "../exam/exam-question/exam-question.entity";


@Entity()
@Index(["topic", "text"], { unique: true })
export class Question extends EntityBase {

    @Column()
    public text: string;

    @ManyToOne(type => Topic, topic => topic.questions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "topicId" })
    public topic: Topic;

    @Column({ nullable: false })
    public topicId: number;

    @OneToMany(type => Answer, answer => answer.question)
    public answers: Answer[];

    @OneToMany(type => ExamQuestion, examQuestion => examQuestion.question)
    public examQuestions: ExamQuestion[];

}
