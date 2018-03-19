import * as _ from "lodash";
import { MiddlewaresConsumer, RequestMethod } from "@nestjs/common";

import { Permission } from "../modules/auth/permission.enum";
import { LoggingMiddleware } from "../middleware/logging.middleware";
import { AuthorizeMiddleware } from "../middleware/authorize.middleware";
import { AuthenticateMiddleware } from "../middleware/authenticate.middleware";


export abstract class BaseModule {

    protected abstract get permissionsMapping(): PermissionMapping[];
    protected abstract get controllers(): any[];

    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(LoggingMiddleware)
            .forRoutes(...this.controllers);

        consumer
            .apply(AuthorizeMiddleware)
            .forRoutes(...this.controllers);

        _.each(this.permissionsMapping, (permissionMapping: PermissionMapping) => {
            consumer
                .apply(AuthenticateMiddleware)
                .with(permissionMapping.permissions)
                .forRoutes(permissionMapping.route);
        });
    }

}

export interface PermissionMapping {
    permissions: Permission[];
    route: { path: string, method: RequestMethod };
}
