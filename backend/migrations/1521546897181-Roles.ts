import * as Bluebird from "bluebird";
import { MigrationInterface, QueryRunner } from "typeorm";


export class Roles1521546897181 implements MigrationInterface {

    private readonly TABLE_ROLE = "role";

    private readonly roles: any[] = [
        { name: "Admin", code: "admin" },
        { name: "User", code: "user" },
        { name: "Content Manager", code: "content-manager" },
        { name: "Stuff Manager", code: "stuff-manager" }
    ];

    public async up(queryRunner: QueryRunner): Promise<any> {
        return Bluebird.map(this.roles, async role => {
            let query: string = `INSERT INTO "${this.TABLE_ROLE}" ("name", "code") VALUES ('${role.name}', '${role.code}');`;

            await queryRunner.query(query);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(`DELETE FROM "${this.TABLE_ROLE}";`);
    }

}
