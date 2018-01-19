import { ForbiddenException } from "@nestjs/common/exceptions";


export class InsufficientPermissionsException extends ForbiddenException {
    constructor() {
        super(`Insufficient permissions`);
    }
}
