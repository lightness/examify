import { HttpException } from "@nestjs/core";
import { Component, OnModuleInit } from "@nestjs/common";
import { createConnection, Connection, EntityManager, Repository, ObjectType, Entity } from "typeorm";

import { DatabaseConfig } from "./database.config";


@Component()
export class DatabaseService implements OnModuleInit {

    /**
     * A Connection reference which is reused by all consumers of the database service
     */
    private _connection: Connection;

    /**
     * Abstract injection so it is possible to use several databases
     * @param databaseConfig
     */
    constructor(private readonly databaseConfig: DatabaseConfig) { }

    public async onModuleInit() {
        console.log("alarm");
        this._connection = await createConnection(this.databaseConfig.getConfiguration());
    }

    /**
     * An async getter for the Connection which creates the connection if needed.
     * @returns {Promise<Connection>}
     */
    private get connection(): Connection {
        return this._connection;
    }

    /**
     * An async getter for the entity manager.
     *
     * Connects to the database if needed and returns a reference to the EntityManager
     * @returns {Promise<EntityManager>}
     */
    public getEntityManager(): EntityManager {
        return this.connection.createEntityManager();
    }

    /**
     * An async getter for repositories.
     *
     * Connects to the database if needed and returns a reference to a Repository for the specified Entity
     * @param entityClassOrName
     * @returns {Promise<Repository<T>>}
     */
    public getRepository<T>(entityClassOrName: ObjectType<T> | string): Repository<T> {
        return this.connection.getRepository<T>(entityClassOrName);
    }
}
