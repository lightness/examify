import * as _ from "lodash";
import { Module, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { Permission } from "../auth/permission.enum";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseConfig } from "../database/database.config";
import { DatabaseModule } from "../database/database.module";
import { DevDatabaseConfig } from "../database/dev.database.config";
import { LoggingMiddleware } from "../../middleware/logging.middleware";
import { AuthorizeMiddleware } from "../../middleware/authorize.middleware";
import { AuthenticateMiddleware } from "../../middleware/authenticate.middleware";


@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [UserController],
    components: [
        UserService,
        { provide: DatabaseConfig, useClass: DevDatabaseConfig }
    ],
})
export class UserModule {

    private permissionsMapping: { permissions: Permission[], route: any }[] = [
        { permissions: [Permission.USER_CREATE], route: { path: "/users", method: RequestMethod.POST } },
        { permissions: [Permission.USER_GET_ALL], route: { path: "/users", method: RequestMethod.GET } },
        { permissions: [Permission.USER_GET_BY_ID], route: { path: "/users/:id", method: RequestMethod.GET } },
        { permissions: [Permission.USER_GET_ROLES], route: { path: "/users/:id/roles", method: RequestMethod.GET } },
    ];

    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthorizeMiddleware)
            .forRoutes(UserController);

        _.each(this.permissionsMapping, permissionMapping => {
            consumer
                .apply(AuthenticateMiddleware)
                .with(permissionMapping.permissions)
                .forRoutes(permissionMapping.route);
        });
    }
}
