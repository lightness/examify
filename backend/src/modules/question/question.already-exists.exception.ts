import { BadRequestException } from "@nestjs/common";

import { Question } from "./question.entity";


export class QuestionAlreadyExistsException extends BadRequestException {

    public constructor(question: Question) {
        super(`Question with such topic and text already exists`);
    }

}
