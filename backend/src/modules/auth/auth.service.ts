import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import { ForbiddenException } from "@nestjs/common/exceptions";

import { Role } from "../roles/role.entity";
import { User } from "../users/user.entity";
import { Permission } from "./permission.enum";
import { DatabaseService } from "../database/database.service";
import { UserNotFoundException } from "../users/user.not-found.exception";


@Component()
export class AuthService {

    constructor(private databaseService: DatabaseService) {
    }

    public async getUserPermissions(userId: number): Promise<Permission[]> {
        let userRepository: Repository<User> = this.databaseService.getRepository(User);
        let user: User = await userRepository
            .createQueryBuilder("user")
            .where("user.id=:userId")
            .leftJoinAndSelect("user.roles", "roles")
            .leftJoinAndSelect("roles.rolePermissions", "rolePermissions")
            .setParameter("userId", userId)
            .getOne();

        if (!user) {
            throw new ForbiddenException("Wrong user in token");
        }

        let permissions: Permission[] = _(user.roles)
            .flatMap(role => role.rolePermissions)
            .map(rolePermission => rolePermission.permission)
            .uniq()
            .value();

        return permissions;
    }
}
