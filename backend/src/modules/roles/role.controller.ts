import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Put, ParseIntPipe, Delete } from "@nestjs/common";

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

    @Get("/:id")
    public async getById( @Res() res: Response, @Param("id", new ParseIntPipe()) id: number) {
        let role: Role = await this.roleService.getById(id);

        res.status(HttpStatus.OK).json(role);
    }

    @Post()
    public async create( @Res() res: Response, @Body() role: Role) {
        let createdRole: Role = await this.roleService.add(role);

        res.status(HttpStatus.OK).json(createdRole);
    }

    @Put("/:id")
    public async update( @Res() res: Response, @Body() role: Role, @Param("id", new ParseIntPipe()) id: number) {
        console.log(">>> +++");
        let updatedRole: Role = await this.roleService.update({ ...role, id });

        res.status(HttpStatus.OK).json(updatedRole);
    }

    @Delete("/:id")
    public async delete( @Res() res: Response, @Param("id", new ParseIntPipe()) id: number) {
        await this.roleService.removeById(id);

        res.status(HttpStatus.NO_CONTENT).end();
    }

}
