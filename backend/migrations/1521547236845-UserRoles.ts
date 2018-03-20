import { MigrationInterface, QueryRunner } from "typeorm";


export class UserRoles1521547236845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let x = await queryRunner.query(`SELECT * FROM "user"`);

        console.log(">>> x", x); // x[0].name || .id
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
