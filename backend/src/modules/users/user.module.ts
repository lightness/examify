import * as _ from "lodash";
import { Module, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { Permission } from "../auth/permission.enum";
import { BaseModule, PermissionMapping } from "../../common/base.module";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseModule } from "../database/database.module";
import { LoggingMiddleware } from "../../middleware/logging.middleware";
import { AuthorizeMiddleware } from "../../middleware/authorize.middleware";
import { AuthenticateMiddleware } from "../../middleware/authenticate.middleware";


@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [UserController],
    components: [
        UserService,
    ],
})
export class UserModule extends BaseModule {

    protected get controllers(): any[] {
        return [UserController];
    }

    protected get permissionsMapping(): PermissionMapping[] {
        return [
            { permissions: [Permission.MANAGE_STUFF], route: { path: "/users", method: RequestMethod.POST } },
            { permissions: [Permission.MANAGE_STUFF], route: { path: "/users", method: RequestMethod.GET } },
            { permissions: [Permission.MANAGE_STUFF], route: { path: "/users/:id", method: RequestMethod.GET } },
            { permissions: [Permission.MANAGE_STUFF], route: { path: "/users/:id/roles", method: RequestMethod.GET } },
        ];
    }
}
