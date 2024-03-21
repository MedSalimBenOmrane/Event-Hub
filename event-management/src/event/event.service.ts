import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { EventStatus } from '../enum/eventStatus.enum';
import { Admin } from '../entities/admin.entity';
import { Creator } from '../entities/creator.entity';
import { Role } from '../enum/role.enum';
import { Participant } from '../entities/participant.entity';
import { SellPoint } from '../entities/sellPoint.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    @InjectRepository(SellPoint)
    private readonly sellPointRepository: Repository<SellPoint>
  ) { }

   async create(createEventDto: CreateEventDto, userId: number): Promise<Event> {
    let user = await this.participantRepository.findOne({ where: { id: userId } });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    if (user.role !== Role.CREATOR) {
      await this.participantRepository.update(userId, { role: Role.CREATOR });
      user = await this.participantRepository.findOne({ where: { id: userId } });
    }
  
    // Vérifiez si le SellPoint existe déjà
    let sellPoint = await this.sellPointRepository.findOne({
      where: {
        name: createEventDto.sellPoint.name,
        address: createEventDto.sellPoint.address,
        phoneNumber: createEventDto.sellPoint.phoneNumber,
      },
    });
  
    // S'il n'existe pas, créez un nouveau SellPoint
    if (!sellPoint) {
      sellPoint = this.sellPointRepository.create({
        name: createEventDto.sellPoint.name,
        address: createEventDto.sellPoint.address,
        phoneNumber: createEventDto.sellPoint.phoneNumber,
      });
      sellPoint = await this.sellPointRepository.save(sellPoint);
    }
  
    // Créez l'événement avec le SellPoint existant ou le nouveau
    const event = this.eventRepository.create(createEventDto);
    event.creator = user as Creator;
    event.sellPoint = sellPoint;
  
    return await this.eventRepository.save(event);
  }
  

  async getRecentNonConfirmedEvents(): Promise<Event[]> {
    const currentDate = new Date();
    return await this.eventRepository
      .createQueryBuilder('event')
      .where('event.eventDate >= :currentDate', { currentDate })
      .andWhere('event.status = :status', { status: EventStatus.PENDING })
      .orderBy('event.eventDate', 'DESC')
      .getMany();
  }
  
  async getConfirmedEvents(): Promise<Event[]> {
    const currentDate = new Date();
    return await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.image', 'image')
      .where('event.eventDate >= :currentDate', { currentDate })
      .andWhere('event.status = :status', { status: EventStatus.CONFIRMED })
      .orderBy('event.eventDate', 'DESC') 
      .getMany();
  }
  
  async findEventsByCreator(creatorId: number): Promise<Event[]> {
    const creator = await this.participantRepository.findOne({
      where: { id: creatorId, role: Role.CREATOR },
    });
    if (!creator) {
      return [];
    }
    return await this.eventRepository.find({
      where: { creator: { id: creatorId } },
      order: {
        eventDate: 'DESC'
      }
    });
  }

  async rejectEvent(id: number, admin: Admin): Promise<void> {
    await this.eventRepository.update(id, { status: EventStatus.REJECTED, admin: admin })
  }

  async acceptEvent(id: number, admin: Admin): Promise<void> {
    await this.eventRepository.update(id, { status: EventStatus.CONFIRMED, admin: admin })
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id: id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    this.eventRepository.update(id, updateEventDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
  
}
