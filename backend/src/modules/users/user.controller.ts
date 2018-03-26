import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";

import { User } from "./user.entity";
import { UserService } from "./user.service";


@Controller("users")
export class UserController {

    public constructor(
        protected userService: UserService) {
    }

    @Get()
    public async getAll( @Res() res: Response) {
        let users: User[] = await this.userService.getAll();
        res.status(HttpStatus.OK).json(users);
    }

    @Get("/:id")
    public async getById( @Res() res: Response, @Param("id") id: string) {
        let user: User = await this.userService.getById(+id);
        res.status(HttpStatus.OK).json(user);
    }

    @Post()
    public async create( @Res() res: Response, @Body() user: User) {
        let createdUser: User = await this.userService.add(user);
        res.status(HttpStatus.OK).json(createdUser);
    }

    @Get("/:id/roles")
    public async getRolesByUserId( @Param("id") id: string, @Res() res: Response) {
        let userRoles = await this.userService.getRolesByUserId(+id);
        res.status(HttpStatus.OK).json(userRoles);
    }

}
