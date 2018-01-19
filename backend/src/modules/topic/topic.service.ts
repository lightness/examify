import * as _ from "lodash";
import * as Bluebird from "bluebird";
import { Repository } from "typeorm";
import { Component } from "@nestjs/common";

import { Topic } from "./topic.entity";
import { Answer } from "../answer/answer.entity";
import { Service } from "../../common/service.interface";
import { Question } from "../question/question.entity";
import { ServiceBase } from "../../common/base.service";
import { DatabaseService } from "../database/database.service";
import { QuestionService } from "../question/question.service";


@Component()
export class TopicService extends ServiceBase<Topic> implements Service<Topic> {

    constructor(
        private databaseService: DatabaseService,
        private questionService: QuestionService
    ) {
        super();
    }

    protected get repository(): Repository<Topic> {
        return this.databaseService.getRepository(Topic);
    }

    public async getById(topicId: number): Promise<Topic> {
        let topic: Topic = await super.getById(topicId);
        (topic as any).hasQuestions = (await this.questionService.getByTopicId(topic.id)).length > 0;

        return topic;
    }

    public async getAll(): Promise<Topic[]> {
        let topics: Topic[] = await super.getAll();

        topics = await Bluebird.map(topics, async topic => {
            let hasQuestions: boolean = (await this.questionService.getByTopicId(topic.id)).length > 0;

            return {
                ..._.omit(topic, "theory") as Topic,
                hasQuestions
            };
        });

        return topics;
    }

}
