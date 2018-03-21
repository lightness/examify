import { Component } from "@nestjs/common";
import { ConnectionOptions } from "typeorm";

import { Role } from "../roles/role.entity";
import { User } from "../users/user.entity";
import { Topic } from "../topic/topic.entity";
import { Answer } from "../answer/answer.entity";
import { Question } from "../question/question.entity";
import { DatabaseConfig } from "./database.config";
import { RolePermission } from "../roles/role-permission.entity";
import { Exam } from "../exam/exam.entity";


@Component()
export class DevDatabaseConfig extends DatabaseConfig {

    public getConfiguration(): ConnectionOptions {
        return {
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "root",
            database: "examify",
            entities: [
                // any entity file under src/modules
                User,
                Role,
                RolePermission,
                Topic,
                Question,
                Answer,
                Exam,
            ],
            synchronize: true,
            logger: "advanced-console",
            logging: "all",
        };
    }

}
