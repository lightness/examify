import { Request, Response } from "express";
import { Controller, Get, Req, Res, Query, ParseIntPipe, HttpStatus, Param } from "@nestjs/common";

import { DashboardService, UserStatistics } from "./dashboard.service";
import { OptionalParseIntPipe } from "../../common/pipes/optional-parse-int.pipe";


@Controller("dashboard")
export class DashboardController {

    public constructor(
        protected dashboardService: DashboardService) {
    }

    @Get("history/user/:userId")
    public async getUserStatistics(
        @Req() req: Request,
        @Res() res: Response,
        @Param("userId", new ParseIntPipe()) userId?: number,
        @Query("topicId", new OptionalParseIntPipe()) topicId?: number,
    ) {
        let userStatistics: UserStatistics = await this.dashboardService.getExamHistoryForUser(userId, topicId);

        res.status(HttpStatus.OK).json(userStatistics);
    }
}
