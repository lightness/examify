import * as passport from "passport";
import { Middleware, NestMiddleware, Next, ExpressMiddleware } from "@nestjs/common";


@Middleware()
export class AuthorizeMiddleware implements NestMiddleware {
    public resolve(): ExpressMiddleware {
        return passport.authenticate("jwt", { assignProperty: "token", session: false });
    }
}
