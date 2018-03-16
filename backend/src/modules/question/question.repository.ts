import { Repository, EntityRepository } from "typeorm";

import { Question } from "./question.entity";
import { QuestionAlreadyExistsException } from "./question.already-exists.exception";


@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {

    public async saveQuestion(question: Question): Promise<Question> {
        try {
            return await this.save(question);
        }
        catch (e) {
            throw new QuestionAlreadyExistsException(question);
        }
    }

}
