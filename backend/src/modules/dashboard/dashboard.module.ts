import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { DashboardService } from "./dashboard.service";
import { DashboardController } from "./dashboard.controller";
import { BaseModule, PermissionMapping } from "../../common/base.module";


@Module({
    imports: [DatabaseModule],
    controllers: [DashboardController],
    components: [
        DashboardService
    ],
})
export class DashboardModule extends BaseModule {

    protected get controllers() {
        return [DashboardController];
    }

    protected get permissionsMapping(): PermissionMapping[] {
        return []; // TODO
    }
}
