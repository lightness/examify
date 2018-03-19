import * as _ from "lodash";
import { Module, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { Permission } from "../auth/permission.enum";
import { BaseModule, PermissionMapping } from "../../common/base.module";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { DatabaseConfig } from "../database/database.config";
import { DatabaseModule } from "../database/database.module";
import { DevDatabaseConfig } from "../database/dev.database.config";


@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [RoleController],
    components: [
        RoleService,
        { provide: DatabaseConfig, useClass: DevDatabaseConfig }
    ],
})
export class RoleModule extends BaseModule {

    protected get controllers() {
        return [RoleController];
    }

    protected get permissionsMapping(): PermissionMapping[] {
        return [
            { permissions: [Permission.ROLE_CREATE], route: { path: "/roles", method: RequestMethod.POST } },
            { permissions: [Permission.ROLE_GET_ALL], route: { path: "/roles", method: RequestMethod.GET } },
        ];
    }
}
