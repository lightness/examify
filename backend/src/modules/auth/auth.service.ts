import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import { ForbiddenException } from "@nestjs/common/exceptions";

import { Role } from "../roles/role.entity";
import { User } from "../users/user.entity";
import { Permission } from "./permission.enum";
import { DatabaseService } from "../database/database.service";
import { UserNotFoundException } from "../users/user.not-found.exception";
import { JwtToken } from "./jwt.token";
import { UserService } from "../users/user.service";
import { BadCredentialsException } from "./bad-credentials.exception";


@Component()
export class AuthService {

    constructor(
        private databaseService: DatabaseService,
    ) {
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

    public async validateJwtPayload(token: JwtToken): Promise<boolean> {
        if (!token || !token.user || !token.user.id || !token.user.name) {
            return false;
        }

        let userRepository: Repository<User> = this.databaseService.getRepository(User);
        let foundUser: User = await userRepository.findOneById(token.user.id);

        return !!foundUser;
    }

    public createToken(user: User): string {
        const EXPIRES_IN = 60 * 60;
        const SECRET = "examify-secret";
        let payload: JwtToken = {
            user: {
                id: user.id,
                name: user.name
            }
        };

        return jwt.sign(user, SECRET, { expiresIn: EXPIRES_IN });
    }

    public async login(name: string, password: string): Promise<{ permissions: Permission[], token: string }> {
        let userRepository: Repository<User> = this.databaseService.getRepository(User);
        let user: User = await userRepository.findOne({ name });

        if (!user) {
            throw new BadCredentialsException();
        }

        let arePasswordsEqual: boolean = await bcrypt.compare(password, user.password);

        if (!arePasswordsEqual) {
            throw new BadCredentialsException();
        }

        return {
            permissions: await this.getUserPermissions(user.id),
            token: this.createToken(user)
        };
    }
}
