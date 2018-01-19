import { NotFoundException } from "@nestjs/common/exceptions";


export class UserNotFoundException extends NotFoundException {

    public constructor() {
        super("User not found");
    }

}
