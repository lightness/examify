import * as _ from "lodash";
import { Response } from "express";
import { Controller, Body, HttpStatus, Res, Post, Put, Param, ParseIntPipe, Delete, Get, Query } from "@nestjs/common"

import { Question } from "./question.entity";
import { QuestionService } from "./question.service";


@Controller("questions")
export class QuestionController {

    public constructor(
        protected questionService: QuestionService) {
    }

    @Get()
    public async listForTopic( @Res() res: Response, @Query("topicId", new ParseIntPipe()) topicId: number) {
        let questions: Question[] = await this.questionService.getByTopicId(topicId);

        res.status(HttpStatus.OK).json(questions);
    }

    @Get("/:id")
    public async getById( @Res() res: Response, @Param("id", new ParseIntPipe()) id: number) {
        let question: Question = await this.questionService.getById(id);

        res.status(HttpStatus.OK).json(question);
    }

    @Post()
    public async create( @Res() res: Response, @Body() question: Question) {
        let createdQuestion: Question = await this.questionService.createWithAnswers(question);

        res.status(HttpStatus.OK).json(createdQuestion);
    }

    @Put("/:id")
    public async update( @Res() res: Response, @Body() question: Question, @Param("id", new ParseIntPipe()) id: number) {
        let updatedQuestion: Question = await this.questionService.updateWithAnswers(_.extend(question, { id }));

        res.status(HttpStatus.OK).json(updatedQuestion);
    }

    @Delete("/:id")
    public async delete( @Res() res: Response, @Param("id", new ParseIntPipe()) id: number) {
        await this.questionService.remove({ id } as Question);

        res.status(HttpStatus.NO_CONTENT).end();
    }

}
