import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { InfoDto } from '../dto/info.dto';
import { Role } from '../enum/role.enum';

@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) { }

  @Post()
  create(@Body() infoDto: InfoDto) {
    return this.participantService.create(infoDto);
  }

  @Get(':role')
  findAllByRole(@Param('role') role: Role) {
    return this.participantService.findAllByRole(role);
  }
}
