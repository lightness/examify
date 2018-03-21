import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { DatabaseModule } from "../database/database.module";
import { BaseModule, PermissionMapping } from "../../common/base.module";


@Module({
    imports: [DatabaseModule],
    components: [
        AuthService,
        JwtStrategy,
    ],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule extends BaseModule {

    protected get controllers() {
        return [AuthController];
    }

    protected get permissionsMapping(): PermissionMapping[] {
        return []; // TODO
    }

}
