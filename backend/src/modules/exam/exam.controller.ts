import { ParseIntPipe } from "@nestjs/common/pipes";
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Query } from "@nestjs/common";

import { Exam } from "./exam.entity";
import { Topic } from "../topic/topic.entity";
import { ExamResult } from "./exam.types";
import { ExamService } from "./exam.service";


@Controller("exam")
export class ExamController {

    public constructor(
        protected examService: ExamService) {
    }

    @Get("start")
    public async startExamByTopic( @Req() req: Request, @Res() res: Response, @Query("topicId", new ParseIntPipe()) topicId: number) {
        let exam: Exam = await this.examService.startExam(topicId, req["token"]);

        res.status(HttpStatus.OK).json(exam);
    }

    @Post("finish")
    public async finishExam( @Req() req: Request, @Body() exam: Exam, @Res() res: Response) {
        let examResult: ExamResult = await this.examService.finishExam(exam, req["token"]);

        res.status(HttpStatus.OK).json(examResult);
    }

}
