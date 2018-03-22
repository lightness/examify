import { Component } from "@nestjs/common";
import { HttpException } from "@nestjs/core";
import { Connection, Repository, ObjectType, EntityManager } from "typeorm";


@Component()
export class DatabaseService {

    private _connection: Connection;
    private _entityManager: EntityManager;

    constructor(connection: Connection, entityManager: EntityManager) {
        this._connection = connection;
        this._entityManager = entityManager;
    }

    public getRepository<T>(entityClassOrName: ObjectType<T> | string): Repository<T> {
        return this._connection.getRepository<T>(entityClassOrName);
    }

    public getCustomRepository<R>(repositoryClass: ObjectType<R>): R {
        return this._entityManager.getCustomRepository<R>(repositoryClass);
    }
}
