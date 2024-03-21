import { IsString, IsInt, IsOptional, IsNumber, ArrayNotEmpty, IsArray, IsNotEmpty, IsBoolean, IsDate } from 'class-validator';
import { SellPoint } from '../../entities/sellPoint.entity';
import { Image } from '../../entities/image.entity';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  lineUp: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsInt()
  capacity: number;

  @IsNotEmpty()
  @IsBoolean()
  alcoholRules: boolean;

  @IsNotEmpty()
  @IsString()
  ageRules: string;

  @IsNotEmpty()
  @IsString()
  dressCode: string;

  @IsNotEmpty()
  @IsNumber()
  ticketPrice: number;

  @IsNotEmpty()
  @IsString()
  eventDate: string;

  @IsNotEmpty()
  sellPoint: SellPoint;
  
  @IsNotEmpty()
  image: Image;

}
