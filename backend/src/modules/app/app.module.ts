import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { ExamModule } from "../exam/exam.module";
import { RoleModule } from "../roles/role.module";
import { UserModule } from "../users/user.module";
import { TopicModule } from "../topic/topic.module";
import { AnswerModule } from "../answer/answer.module";
import { QuestionModule } from "../question/question.module";
import { CategoryModule } from "../categories/category.module";


@Module({
    modules: [
        UserModule,
        CategoryModule,
        RoleModule,
        TopicModule,
        ExamModule,
        AnswerModule,
        QuestionModule,
    ],
})
export class ApplicationModule { }
