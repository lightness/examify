import { Module } from "@nestjs/common";

import { AnswerService } from "./answer.service";
import { DatabaseConfig } from "../database/database.config";
import { DatabaseModule } from "../database/database.module";
import { DevDatabaseConfig } from "../database/dev.database.config";


@Module({
    modules: [DatabaseModule],
    controllers: [],
    components: [
        AnswerService,
        { provide: DatabaseConfig, useClass: DevDatabaseConfig }
    ],
    exports: [AnswerService]
})
export class AnswerModule {

}
