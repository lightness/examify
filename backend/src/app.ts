import "reflect-metadata";

import * as express from "express";
import * as bodyParser from "body-parser";
import { NestFactory } from "@nestjs/core";
import { Request, Response } from "express";

import { ApplicationModule } from "./modules/app/app.module";


const PORT = 3000;
const instance = express();
instance.use(bodyParser.json());

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule, instance, null);
    app.setGlobalPrefix("/api/v1");
    await app.listen(PORT, () => console.log(`Application is listening on port ${PORT}`));
}

bootstrap();
