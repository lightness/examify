import { BadRequestException } from "@nestjs/common";

import { Answer } from "./answer.entity";


export class AnswerAlreadyExistsException extends BadRequestException {

    public constructor(answer: Answer) {
        super(`Answer with such question and text already exists`);
    }

}
