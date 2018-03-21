import { ParseIntPipe } from "@nestjs/common/pipes";
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Query } from "@nestjs/common";

import { Topic } from "../topic/topic.entity";
import { ExamService } from "./exam.service";
import { ExamResult, ExamData } from "./exam.types";
import { Exam } from "./exam.entity";


@Controller("exam")
export class ExamController {

    public constructor(
        protected examService: ExamService) {
    }

    @Get("start")
    public async getExam( @Res() req: Request, @Res() res: Response, @Query("topicId", new ParseIntPipe()) topicId: number) {
        let exam: Exam = await this.examService.startExam(topicId, req["token"]);

        res.status(HttpStatus.OK).json(exam);
    }

    @Post("check")
    public async checkExam( @Body() examData: ExamData, @Res() res: Response) {
        let examResult: ExamResult = await this.examService.checkExam(examData);

        res.status(HttpStatus.OK).json(examResult);
    }

}
