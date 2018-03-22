import * as _ from "lodash";
import * as Bluebird from "bluebird";
import { MigrationInterface, QueryRunner } from "typeorm";


export class UserRoles1521547236845 implements MigrationInterface {

    private readonly TABLE_USER = "user";
    private readonly TABLE_ROLE = "role";
    private readonly TABLE_USER_ROLE = "user_role";

    public async up(queryRunner: QueryRunner): Promise<any> {
        let users: any[] = await queryRunner.query(`SELECT * FROM "${this.TABLE_USER}";`);
        let roles: any[] = await queryRunner.query(`SELECT * FROM "${this.TABLE_ROLE}";`);

        await Bluebird.map(users, user => {
            let role = _.find(roles, r => r.code === user.name);

            if (role) {
                let query: string = `INSERT INTO "${this.TABLE_USER_ROLE}" ("userId", "roleId") VALUES (${user.id}, ${role.id});`;

                return queryRunner.query(query);
            }
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "${this.TABLE_USER_ROLE}";`);
    }

}
