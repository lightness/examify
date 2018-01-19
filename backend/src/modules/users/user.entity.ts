import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { Role } from "../roles/role.entity";
import { EntityBase } from "../../common/base.entity";


@Entity()
export class User extends EntityBase {

    @Column({ unique: true })
    public name: string;

    @Column()
    public password: string;

    @ManyToMany(type => Role)
    @JoinTable({ name: "user_role" })
    public roles: Role[];

}
