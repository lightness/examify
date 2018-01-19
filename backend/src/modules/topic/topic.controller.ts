import * as _ from "lodash";
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Put, ParseIntPipe, Delete } from "@nestjs/common";

import { Topic } from "./topic.entity";
import { TopicService } from "./topic.service";


@Controller("topics")
export class TopicController {

    public constructor(
        protected topicService: TopicService) {
    }

    @Post()
    public async create( @Body() topic: Topic, @Res() res: Response) {
        let createdTopic: Topic = await this.topicService.add(topic);

        res.status(HttpStatus.OK).json(createdTopic);
    }

    @Put("/:id")
    public async update( @Body() topic: Topic, @Res() res: Response, @Param("id", new ParseIntPipe()) id: number) {
        let updatedTopic: Topic = await this.topicService.update(_.extend(topic, { id }));

        res.status(HttpStatus.OK).json(updatedTopic);
    }

    @Delete("/:id")
    public async delete( @Res() res: Response, @Param("id", new ParseIntPipe()) id: number) {
        await this.topicService.remove({ id } as Topic);

        res.status(HttpStatus.NO_CONTENT).end();
    }

    @Get()
    public async list( @Res() res: Response) {
        let topics: Topic[] = await this.topicService.getAll();

        res.status(HttpStatus.OK).json(topics);
    }

    @Get("/:id")
    public async get( @Res() res: Response, @Param("id", new ParseIntPipe()) id: number) {
        let topic: Topic = await this.topicService.getById(id);

        res.status(HttpStatus.OK).json(topic);
    }

}
