import { NotFoundException } from "@nestjs/common/exceptions";


export class TopicNotFoundException extends NotFoundException {

    public constructor(topicId: number) {
        super(`Topic with ID#${topicId} not found`)
    }

}