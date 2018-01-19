import { Module } from "@nestjs/common";

import { ExamService } from './exam.service';
import { DatabaseConfig } from '../database/database.config';
import { DatabaseModule } from '../database/database.module';
import { ExamController } from './exam.controller';
import { DevDatabaseConfig } from '../database/dev.database.config';


@Module({
    imports: [DatabaseModule],
    controllers: [ExamController],
    components: [
        ExamService,
        { provide: DatabaseConfig, useClass: DevDatabaseConfig }
    ],
})
export class ExamModule {

}
