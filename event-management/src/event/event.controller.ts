import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../enum/role.enum';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('accept/:id')
  acceptEvent(@Param('id') id: number, @Req() req) {
    const user = req.user;
    return this.eventService.acceptEvent(+id, user);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('reject/:id')
  rejectEvent(@Param('id') id: number, @Req() req) {
    const user = req.user;
    return this.eventService.rejectEvent(+id, user);
  }

  @Roles(Role.CREATOR, Role.PARTICIPANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto, @Req() req) {
    const userId = req.user.id;
    return this.eventService.create(createEventDto, userId);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/recent')
  getRecentNonConfirmedEvents() {
    return this.eventService.getRecentNonConfirmedEvents();
  }

  @Roles(Role.CREATOR, Role.PARTICIPANT)
  @UseGuards(JwtAuthGuard)
  @Get('/myEvents')
  async getMyEvents(@Req() req) {
    const creatorId = req.user.id;
    const events = await this.eventService.findEventsByCreator(creatorId);
    return events;
  }

  @Roles(Role.CREATOR, Role.PARTICIPANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/confirmed')
  async getConfirmedEvents() {
    return this.eventService.getConfirmedEvents();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
