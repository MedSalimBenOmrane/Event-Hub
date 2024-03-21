import { PartialType } from '@nestjs/mapped-types';
import { CreateSellPointDto } from './create-sell-point.dto';

export class UpdateSellPointDto extends PartialType(CreateSellPointDto) {}
