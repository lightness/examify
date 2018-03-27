import { Entity, Column, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm";

import { EntityBase } from "../../common/base-entity";
import { RolePermission } from "./role-permission.entity";
import { User } from "../users/user.entity";


@Entity()
export class Role extends EntityBase {

    @Column({ unique: true })
    public code: string;

    @Column({ unique: true })
    public name: string;

    @OneToMany(type => RolePermission, rolePermission => rolePermission.role, { cascadeInsert: true, cascadeUpdate: true, eager: true })
    public rolePermissions: RolePermission[];

    @ManyToMany(type => User, user => user.roles)
    public users: User[];

}
