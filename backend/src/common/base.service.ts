import { Repository } from "typeorm";

import { Service } from "./service.interface";
import { EntityBase } from "./base-entity";


export abstract class ServiceBase<T extends EntityBase> implements Service<T> {

    protected abstract get repository(): Repository<T>;

    public async add(object: T): Promise<T> {
        return this.repository.save(object);
    }

    public async addAll(objects: T[]): Promise<T[]> {
        return this.repository.save(objects);
    }

    public async getAll(): Promise<T[]> {
        return this.repository.find();
    }

    public async getById(id: number): Promise<T> {
        return this.repository.findOneById(id);
    }

    public async update(object: T): Promise<T> {
        return this.repository.save(object);
    }

    public async remove(object: T): Promise<T> {
        return this.repository.remove(object);
    }

}
