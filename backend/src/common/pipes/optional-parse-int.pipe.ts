import { Pipe, ParseIntPipe } from "@nestjs/common";
import { ArgumentMetadata } from "@nestjs/common/interfaces";


@Pipe()
export class OptionalParseIntPipe extends ParseIntPipe {
    public async transform(data: any, metadata: ArgumentMetadata) {
        if (!data) {
            return data;
        }

        return super.transform(data, metadata);
    }
}
