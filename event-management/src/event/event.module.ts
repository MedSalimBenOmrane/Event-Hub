import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { Participant } from '../entities/participant.entity';
import { Image } from '../entities/image.entity';
import { SellPoint } from '../entities/sellPoint.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Participant, SellPoint])
  ],
  controllers: [EventController],
  providers: [EventService],

})
export class EventModule { }
