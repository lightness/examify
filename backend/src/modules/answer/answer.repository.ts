import { Repository, EntityRepository } from "typeorm";

import { Answer } from "./answer.entity";
import { AnswerAlreadyExistsException } from "./answer.already-exists.exception";


@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {

    public async saveAnswer(answer: Answer): Promise<Answer> {
        try {
            return await this.save(answer);
        }
        catch (e) {
            throw new AnswerAlreadyExistsException(answer);
        }
    }

}
