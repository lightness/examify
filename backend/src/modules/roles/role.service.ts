import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";

import { Service } from "../../common/service.interface";
import { Role } from "./role.entity";
import { ServiceBase } from "../../common/base.service";
import { DatabaseService } from "../database/database.service";
import { RolePermission } from "./role-permission.entity";


@Component()
export class RoleService extends ServiceBase<Role> implements Service<Role> {

    constructor(private databaseService: DatabaseService) {
        super();
    }

    protected get repository(): Repository<Role> {
        return this.databaseService.getRepository(Role);
    }

    public async removeById(roleId: number): Promise<void> {
        let role = await this.repository.findOneById(roleId);
        await this.repository.save({ ...role, users: [] }); // Dirty hack
        await this.repository.remove(role);
    }
}
