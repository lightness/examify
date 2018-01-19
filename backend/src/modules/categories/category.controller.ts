import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";

import { CategoryService } from "./category.service";
import { Category } from "./category.entity";


@Controller("categories")
export class CategoryController {

    public constructor(
        private categoryService: CategoryService) {
    }

    @Get()
    public getAll( @Res() res: Response) {
        this.categoryService.getAll()
            .then((categories: Category[]) => {
                res.status(HttpStatus.OK).json(categories);
            });
    }

    @Get("/:id")
    public getById( @Res() res: Response, @Param("id") id: string) {
        this.categoryService.getById(+id)
            .then((category) => res.status(HttpStatus.OK).json(category));
    }

    @Post()
    public create( @Res() res: Response, @Body() category: Category) {
        console.log(category);
        this.categoryService.add(category)
            .then((createdCategory) => res.status(HttpStatus.OK).json(createdCategory));
    }
}
