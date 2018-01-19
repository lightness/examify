import { Entity, Column, OneToMany, JoinColumn } from "typeorm";

import { EntityBase } from "../../common/base.entity";
import { RolePermission } from "./role-permission.entity";


@Entity()
export class Role extends EntityBase {

    @Column({ unique: true })
    public code: string;

    @Column({ unique: true })
    public name: string;

    @OneToMany(type => RolePermission, rolePermission => rolePermission.role)
    public rolePermissions: RolePermission[];

}
