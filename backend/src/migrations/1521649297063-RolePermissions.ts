import * as _ from "lodash";
import * as Bluebird from "bluebird";
import { MigrationInterface, QueryRunner } from "typeorm";

import { Permission } from "../modules/auth/permission.enum";


export class RolePermissions1521649297063 implements MigrationInterface {

    private readonly TABLE_ROLE = "role";
    private readonly TABLE_ROLE_PERMISSION = "role_permission";

    private readonly roleToPermissionMapping: any[] = [
        { roleCode: "user", permissions: [Permission.VIEW_DASHBOARD] },
        { roleCode: "content-manager", permissions: [Permission.VIEW_DASHBOARD, Permission.MANAGE_CONTENT] },
        { roleCode: "stuff-manager", permissions: [Permission.VIEW_DASHBOARD, Permission.MANAGE_STUFF] },
        { roleCode: "admin", permissions: _.values(Permission) },
    ];

    public async up(queryRunner: QueryRunner): Promise<any> {
        let roles: any[] = await queryRunner.query(`SELECT * FROM "${this.TABLE_ROLE}";`);

        await Bluebird.map(roles, role => {
            let mapping = _.find(this.roleToPermissionMapping, m => m.roleCode === role.code);

            if (!mapping) {
                return;
            }

            return Bluebird.map(mapping.permissions, permission => {
                return queryRunner.query(`INSERT INTO "${this.TABLE_ROLE_PERMISSION}" ("roleId", "permission") VALUES (${role.id}, '${permission}');`);
            });
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(`DELETE FROM "${this.TABLE_ROLE_PERMISSION}";`);
    }

}
