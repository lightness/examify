import { Component } from "@nestjs/common";
import { Repository } from "typeorm";

import { Answer } from "./answer.entity";
import { Service } from "../../common/service.interface";
import { ServiceBase } from "../../common/base.service";
import { DatabaseService } from "../database/database.service";
import { AnswerAlreadyExistsException } from "./answer.already-exists.exception";


@Component()
export class AnswerService extends ServiceBase<Answer> implements Service<Answer> {

    constructor(private databaseService: DatabaseService) {
        super();
    }

    protected get repository(): Repository<Answer> {
        return this.databaseService.getRepository(Answer);
    }

    public async add(answer: Answer): Promise<Answer> {
        try {
            return await super.add(answer);
        }
        catch (e) {
            throw new AnswerAlreadyExistsException(answer);
        }
    }

    public async getByQuestionId(questionId: number): Promise<Answer[]> {
        let answers: Answer[] = await this.repository.createQueryBuilder("answer")
            .where("answer.questionId = :questionId", { questionId })
            .getMany();

        return answers;
    }

}
