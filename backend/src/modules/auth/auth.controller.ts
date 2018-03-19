import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthCredentials } from "./auth-credentials.interface";
import { Permission } from "./permission.enum";


@Controller("auth")
export class AuthController {

    private readonly AUTH_HEADER_NAME = "Authorization";

    public constructor(
        protected authService: AuthService) {
    }

    @Post("login")
    public async login( @Res() res: Response, @Body() { name, password }: AuthCredentials) {
        let authData: { permissions: Permission[], token: string } = await this.authService.login(name, password);

        res.setHeader(this.AUTH_HEADER_NAME, authData.token);
        res.status(HttpStatus.OK).json(authData.permissions);
    }

}
