import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";

import { Role } from "./role.entity";
import { RoleService } from "./role.service";


@Controller("roles")
export class RoleController {

    public constructor(
        protected roleService: RoleService) {
    }

    @Get()
    public async getAll( @Res() res: Response) {
        let roles: Role[] = await this.roleService.getAll();
        res.status(HttpStatus.OK).json(roles);
    }

    @Post()
    public async create( @Res() res: Response, @Body() role: Role) {
        let createdRole: Role = await this.roleService.add(role);
        res.status(HttpStatus.OK).json(createdRole);
    }

}
