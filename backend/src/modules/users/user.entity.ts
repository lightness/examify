import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

import { Role } from "../roles/role.entity";
import { Exam } from "../exam/exam.entity";
import { EntityBase } from "../../common/base-entity";


@Entity()
export class User extends EntityBase {

    @Column({ unique: true })
    public name: string;

    @Column()
    public password: string;

    @ManyToMany(type => Role)
    @JoinTable({ name: "user_role" })
    public roles: Role[];

    @OneToMany(type => Exam, exam => exam.user)
    public exams: Exam[];

}
