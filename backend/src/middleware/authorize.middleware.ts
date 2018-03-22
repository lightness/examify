import * as passport from "passport";
import { Request, Response, NextFunction } from "express";
import { Middleware, NestMiddleware, Next, ExpressMiddleware } from "@nestjs/common";


@Middleware()
export class AuthorizeMiddleware implements NestMiddleware {
    public resolve(): ExpressMiddleware {
        return (req: Request, res: Response, next: NextFunction) => {
            console.log(">>> Authorize middleware");
            let isAuthHeaderExists: boolean = !!req.get("authorization");

            console.log(">>> isAuthHeaderExists", isAuthHeaderExists);

            if (!isAuthHeaderExists) {
                return next();
            }

            return passport.authenticate("jwt", { assignProperty: "token", session: false })(req, res, next);
        };
    }
}
