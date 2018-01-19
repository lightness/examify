import * as _ from "lodash";
import * as passport from "passport";
import { Response } from "express";
import { HttpException } from "@nestjs/core";
import { HttpStatus, Middleware, NestMiddleware, Next } from "@nestjs/common";
import { ExtractJwt, StrategyOptions, Strategy as JwtStrategy } from "passport-jwt";

import { Permission } from "../modules/auth/permission.enum";
import { AuthService } from "../modules/auth/auth.service";
import { InsufficientPermissionsException } from "../modules/auth/insufficient-privileges.exception";


@Middleware()
export class AuthenticateMiddleware implements NestMiddleware {

    public constructor(protected authService: AuthService) { }

    public resolve(requiredPermissions: Permission[]): (req, res, next) => void {
        return async (req, res: Response, next) => {
            let token = req["token"];
            let userId = token.user; // test token = { user: 1 }

            let userPermissions: Permission[] = await this.authService.getUserPermissions(userId);

            console.log("-------AuthenticateMiddleware LOG START---------");
            console.log("requiredPermissions:", requiredPermissions);
            console.log("userPermissions:", userPermissions);
            console.log("-------AuthenticateMiddleware LOG END-----------");

            let isAllowed: boolean = _.difference(requiredPermissions, userPermissions).length === 0;

            if (!isAllowed) {
                throw new InsufficientPermissionsException();
            }

            next();
        };
    }
}
