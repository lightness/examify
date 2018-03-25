import * as Bluebird from "bluebird";
import { MigrationInterface, QueryRunner } from "typeorm";

import { Topic } from "../modules/topic/topic.entity";
import { TOPICS } from "../seeder/topics-questions-answers";
import { Question } from "../modules/question/question.entity";


export class Questions1521992705812 implements MigrationInterface {

    private readonly TABLE_TOPIC = "topic";
    private readonly TABLE_QUESTION = "question";

    public async up(queryRunner: QueryRunner): Promise<any> {
        return Bluebird.map(TOPICS, async topic => {
            if (!topic || !topic.questions || !topic.questions.length) {
                return;
            }

            let [foundTopic, ]: Topic[] = await queryRunner.query(`SELECT id FROM "${this.TABLE_TOPIC}" WHERE title = '${topic.title}'`);

            return Bluebird.map(topic.questions as Question[], question => {
                let query: string = `INSERT INTO "${this.TABLE_QUESTION}" ("text", "topicId") VALUES ('${question.text}', '${foundTopic.id}');`;

                return queryRunner.query(query);
            });
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
