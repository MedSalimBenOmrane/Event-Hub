import { PartialType } from '@nestjs/mapped-types';
import { InfoDto } from './info.dto';

export class UpdatePersonDto extends PartialType(InfoDto) {}
