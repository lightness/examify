import { Component } from "@nestjs/common";
import { Repository } from "typeorm";

import { Service } from "../../common/service.interface";
import { Category } from "./category.entity";
import { ServiceBase } from "../../common/base.service";
import { DatabaseService } from "../database/database.service";


@Component()
export class CategoryService extends ServiceBase<Category> implements Service<Category> {

    constructor(private databaseService: DatabaseService) {
        super();
    }

    protected get repository(): Repository<Category> {
        return this.databaseService.getRepository(Category);
    }

}
