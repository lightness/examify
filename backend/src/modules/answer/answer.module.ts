import { Module } from "@nestjs/common";

import { AnswerService } from "./answer.service";
import { DatabaseModule } from "../database/database.module";


@Module({
    modules: [DatabaseModule],
    controllers: [],
    components: [
        AnswerService,
    ],
    exports: [AnswerService]
})
export class AnswerModule {

}
