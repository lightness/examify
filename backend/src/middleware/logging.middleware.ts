import { Request } from "express";
import { Middleware, NestMiddleware, ExpressMiddleware } from "@nestjs/common";


@Middleware()
export class LoggingMiddleware implements NestMiddleware {
    public resolve(): ExpressMiddleware {
        return (req: Request, res, next) => {
            // console.log("Request headers...", req.headers);
            next();
        };
    }
}
