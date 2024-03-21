import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSellPointDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsNumber()
    phoneNumber: number;
}
