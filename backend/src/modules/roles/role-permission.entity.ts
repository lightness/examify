import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";

import { Role } from "./role.entity";
import { Permission } from "../auth/permission.enum";
import { EntityBase } from "../../common/base.entity";


@Entity()
export class RolePermission extends EntityBase {

    @ManyToOne(type => Role, role => role.rolePermissions)
    public role: Role;

    @Column({ enum: Permission })
    public permission: Permission;

}
