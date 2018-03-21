import { Module, MiddlewaresConsumer } from "@nestjs/common";

import { ExamService } from "./exam.service";
import { DatabaseModule } from "../database/database.module";
import { ExamController } from "./exam.controller";
import { AuthorizeMiddleware } from "../../middleware/authorize.middleware";
import { BaseModule, PermissionMapping } from "../../common/base.module";


@Module({
    imports: [DatabaseModule],
    controllers: [ExamController],
    components: [
        ExamService
    ],
})
export class ExamModule extends BaseModule {

    protected get controllers() {
        return [ExamController];
    }

    protected get permissionsMapping(): PermissionMapping[] {
        return []; // TODO
    }
}
