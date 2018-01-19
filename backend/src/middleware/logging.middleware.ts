import { Middleware, NestMiddleware } from "@nestjs/common";


@Middleware()
export class LoggingMiddleware implements NestMiddleware {
    public resolve(): (req, res, next) => void {
        return (req, res, next) => {
            console.log("Request...", req["token"]);
            next();
        };
    }
}
