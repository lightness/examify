import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { DatabaseModule } from "../database/database.module";
import { JwtStrategy } from "./jwt.strategy";
import { DatabaseConfig } from "../database/database.config";
import { DevDatabaseConfig } from "../database/dev.database.config";
import { AuthController } from "./auth.controller";


@Module({
    imports: [DatabaseModule],
    components: [
        AuthService,
        JwtStrategy,
        { provide: DatabaseConfig, useClass: DevDatabaseConfig }
    ],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
