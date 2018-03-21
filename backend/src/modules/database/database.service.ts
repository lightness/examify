import { Component } from "@nestjs/common";
import { HttpException } from "@nestjs/core";
import { Connection, Repository, ObjectType } from "typeorm";


@Component()
export class DatabaseService {

    private _connection: Connection;

    constructor(connection: Connection) {
        this._connection = connection;
    }

    private get connection(): Connection {
        return this._connection;
    }

    public getRepository<T>(entityClassOrName: ObjectType<T> | string): Repository<T> {
        return this.connection.getRepository<T>(entityClassOrName);
    }
}
