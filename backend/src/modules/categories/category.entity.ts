import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { EntityBase } from "../../common/base.entity";


@Entity()
export class Category extends EntityBase {

    @Column()
    public name: string;

    @Column()
    public description: string;

}
