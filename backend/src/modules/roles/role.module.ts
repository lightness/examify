import * as _ from "lodash";
import { Module, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { Permission } from "../auth/permission.enum";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { DatabaseConfig } from "../database/database.config";
import { DatabaseModule } from "../database/database.module";
import { DevDatabaseConfig } from "../database/dev.database.config";
import { LoggingMiddleware } from "../../middleware/logging.middleware";
import { AuthorizeMiddleware } from "../../middleware/authorize.middleware";
import { AuthenticateMiddleware } from "../../middleware/authenticate.middleware";


@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [RoleController],
    components: [
        RoleService,
        { provide: DatabaseConfig, useClass: DevDatabaseConfig }
    ],
})
export class RoleModule {
    private permissionsMapping: { permissions: Permission[], route: any }[] = [
        { permissions: [Permission.ROLE_CREATE], route: { path: "/roles", method: RequestMethod.POST } },
        { permissions: [Permission.ROLE_GET_ALL], route: { path: "/roles", method: RequestMethod.GET } },
    ];

    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthorizeMiddleware)
            .forRoutes(RoleController);

        _.each(this.permissionsMapping, permissionMapping => {
            consumer
                .apply(AuthenticateMiddleware)
                .with(permissionMapping.permissions)
                .forRoutes(permissionMapping.route);
        });
    }
}
