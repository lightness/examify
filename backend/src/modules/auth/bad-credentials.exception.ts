import { ForbiddenException } from "@nestjs/common/exceptions";


export class BadCredentialsException extends ForbiddenException {
    constructor() {
        super(`Bad credentials`);
    }
}
