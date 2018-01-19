import * as _ from "lodash";
import { MiddlewaresConsumer, Module, RequestMethod } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { Permission } from "../auth/permission.enum";
import { AuthService } from "../auth/auth.service";
import { DatabaseModule } from "../database/database.module";
import { DatabaseConfig } from "../database/database.config";
import { CategoryService } from "./category.service";
import { DevDatabaseConfig } from "../database/dev.database.config";
import { LoggingMiddleware } from "../../middleware/logging.middleware";
import { CategoryController } from "./category.controller";
import { AuthorizeMiddleware } from "../../middleware/authorize.middleware";
import { AuthenticateMiddleware } from "../../middleware/authenticate.middleware";


@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [CategoryController],
    components: [
        CategoryService,
        { provide: DatabaseConfig, useClass: DevDatabaseConfig },
    ],
})
export class CategoryModule {

    private permissionsMapping: { permissions: Permission[], route: any }[] = [
        { permissions: [Permission.CATEGORY_CREATE], route: { path: "/categories", method: RequestMethod.POST } },
        { permissions: [Permission.CATEGORY_GET_ALL], route: { path: "/categories", method: RequestMethod.GET } },
        { permissions: [Permission.CATEGORY_GET_BY_ID], route: { path: "/categories/:id", method: RequestMethod.GET } },
    ];

    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthorizeMiddleware)
            .forRoutes(CategoryController);

        _.each(this.permissionsMapping, permissionMapping => {
            consumer
                .apply(AuthenticateMiddleware)
                .with(permissionMapping.permissions)
                .forRoutes(permissionMapping.route);
        });
    }
}
