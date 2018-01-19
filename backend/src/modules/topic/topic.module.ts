import { Module } from "@nestjs/common";

import { TopicService } from './topic.service';
import { DatabaseConfig } from '../database/database.config';
import { DatabaseModule } from '../database/database.module';
import { QuestionModule } from '../question/question.module';
import { TopicController } from './topic.controller';
import { DevDatabaseConfig } from '../database/dev.database.config';


@Module({
    imports: [DatabaseModule, QuestionModule],
    controllers: [TopicController],
    components: [
        TopicService,
        { provide: DatabaseConfig, useClass: DevDatabaseConfig }
    ],
})
export class TopicModule {

}
