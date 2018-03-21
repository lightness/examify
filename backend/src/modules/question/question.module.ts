import { Module } from "@nestjs/common";

import { AnswerModule } from "../answer/answer.module";
import { DatabaseModule } from "../database/database.module";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { BaseModule, PermissionMapping } from "../../common/base.module";


@Module({
    imports: [DatabaseModule, AnswerModule],
    controllers: [QuestionController],
    components: [
        QuestionService,
    ],
    exports: [QuestionService]
})
export class QuestionModule extends BaseModule {

    protected get controllers() {
        return [QuestionController];
    }

    protected get permissionsMapping(): PermissionMapping[] {
        return []; // TODO
    }
}
