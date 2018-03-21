import * as _ from "lodash";
import * as Bluebird from "bluebird";
import * as bcrypt from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";


export class UserMigration1521544582610 implements MigrationInterface {

    private readonly TABLE_USER = "user";

    private readonly users: any[] = [
        { name: "admin", password: "password" },
        { name: "user", password: "password" },
        { name: "content-manager", password: "password" },
        { name: "stuff-manager", password: "password" }
    ];

    public async up(queryRunner: QueryRunner): Promise<any> {
        return Bluebird.map(this.users, async user => {
            let encryptedPassword: string = await bcrypt.hash(user.password, 10);
            let query: string = `INSERT INTO "${this.TABLE_USER}" ("name", "password") VALUES ('${user.name}', '${encryptedPassword}');`;

            await queryRunner.query(query);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(`DELETE FROM "${this.TABLE_USER}";`);
    }

}
