import { Module } from "@nestjs/common";

import { BaseModule, PermissionMapping } from "../../common/base.module";
import { TopicService } from "./topic.service";
import { DatabaseModule } from "../database/database.module";
import { QuestionModule } from "../question/question.module";
import { TopicController } from "./topic.controller";


@Module({
    imports: [DatabaseModule, QuestionModule],
    controllers: [TopicController],
    components: [
        TopicService,
    ],
})
export class TopicModule extends BaseModule {

    protected get controllers() {
        return [TopicController];
    }

    protected get permissionsMapping(): PermissionMapping[] {
        return []; // TODO
    }
}
