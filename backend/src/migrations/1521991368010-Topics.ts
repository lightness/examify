import * as Bluebird from "bluebird";
import { MigrationInterface, QueryRunner } from "typeorm";

import { TOPICS } from "../seeder/topics-questions-answers";


export class Topics1521991368010 implements MigrationInterface {

    private readonly TABLE_TOPIC = "topic";

    public async up(queryRunner: QueryRunner): Promise<any> {
        return Bluebird.map(TOPICS, async topic => {
            let query: string = `INSERT INTO "${this.TABLE_TOPIC}" ("title", "theory") VALUES ('${topic.title}', '${topic.theory}');`;

            await queryRunner.query(query);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(`DELETE FROM "${this.TABLE_TOPIC}";`);
    }

}
