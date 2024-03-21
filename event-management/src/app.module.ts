import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { SellPointModule } from './sell-point/sell-point.module';
import { ImageModule } from './image/image.module';
import { Admin } from './entities/admin.entity';
import { Creator } from './entities/creator.entity';
import { Event } from './entities/event.entity';
import { SellPoint } from './entities/sellPoint.entity';
import { Ticket } from './entities/ticket.entity';
import { Image } from './entities/image.entity';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { Participant } from './entities/participant.entity';
import { ParticipantModule } from './participant/participant.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: true,
      options: {
        enableArithAbort: true,
        trustServerCertificate: true,
        encrypt: true
      }
    }),
    EventModule,
    TicketModule,
    SellPointModule,
    ImageModule,
    AdminModule,
    AuthModule,
    ParticipantModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService,]
})
export class AppModule {}
