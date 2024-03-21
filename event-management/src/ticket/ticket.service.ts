import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { TicketStatus } from '../enum/ticketStatus.enum';
import { EventService } from '../event/event.service';
import { Role } from '../enum/role.enum';
import { Participant } from '../entities/participant.entity';
import { Event } from '../entities/event.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ) { }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(createTicketDto);
    return await this.ticketRepository.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketRepository.find();
  }

  async findTicketsByPurchaser(purchaserId: number): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      where: { purchaser: { id: purchaserId } },
      relations: ['event'], 
    });
  }

  async buyTicket(purchaser: Participant, eventId: number): Promise<Ticket> {
    const event = await this.eventRepository.findOne(({ where: { id: eventId } }));
    if (event.capacity <= 0) {
      throw new NotFoundException('Event is sold out.');
    }
    event.capacity--;
    const createTicketDto: CreateTicketDto = {
      status: TicketStatus.PAID,
      purchaser: purchaser,
      event: event,
    };
    const ticket = this.create(createTicketDto);
    await this.eventRepository.update(eventId, { capacity: event.capacity });
    return ticket;
  }

  async reserveTicket(purchaser: Participant, eventId: number): Promise<Ticket> {
    const event = await this.eventRepository.findOne({ where: { id: eventId } });
    if (event.capacity <= 0) {
      throw new NotFoundException('Event is sold out.');
    }
    event.capacity--;
    const createTicketDto: CreateTicketDto = {
      status: TicketStatus.RESERVED,
      purchaser: purchaser,
      event: event,
    };
    const ticket = this.create(createTicketDto);
    await this.eventRepository.update(eventId, { capacity: event.capacity });
    return ticket;
  }

}