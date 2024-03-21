import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateImageDto {

    @IsNotEmpty()
    data: Buffer;
}
