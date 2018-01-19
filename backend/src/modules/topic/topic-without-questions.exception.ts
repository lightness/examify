import { BadRequestException } from "@nestjs/common/exceptions";


export class TopicWithoutQuestionsException extends BadRequestException {

    public constructor(topicId: number) {
        super(`Topic ID#${topicId} is without questions`)
    }

}