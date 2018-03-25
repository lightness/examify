import * as Bluebird from "bluebird";
import { MigrationInterface, QueryRunner } from "typeorm";
import { TOPICS } from "../seeder/topics-questions-answers";
import { Topic } from "../modules/topic/topic.entity";
import { Question } from "../modules/question/question.entity";


export class Answers1521994590010 implements MigrationInterface {

    private readonly TABLE_TOPIC = "topic";
    private readonly TABLE_QUESTION = "question";
    private readonly TABLE_ANSWER = "answer";

    public async up(queryRunner: QueryRunner): Promise<any> {
        return Bluebird.map(TOPICS, async topic => {
            if (!topic || !topic.questions || !topic.questions.length) {
                return;
            }

            let [foundTopic, ]: Topic[] = await queryRunner.query(`SELECT id FROM "${this.TABLE_TOPIC}" WHERE "title" = '${topic.title}'`);

            return Bluebird.map(topic.questions as Question[], async question => {
                if (!question || !question.answers || !question.answers.length) {
                    return;
                }

                let [foundQuestion, ]: Question[] = await queryRunner.query(`SELECT id FROM "${this.TABLE_QUESTION}" WHERE "topicId" = ${foundTopic.id} AND text = '${question.text}'`);

                return Bluebird.map(question.answers, answer => {
                    let query: string = `INSERT INTO "${this.TABLE_ANSWER}" ("text", "isCorrect", "questionId") VALUES ('${answer.text}', ${answer.isCorrect}, ${foundQuestion.id});`;

                    return queryRunner.query(query);
                });
            });
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
