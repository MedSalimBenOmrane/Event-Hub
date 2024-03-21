import * as dotenv from 'dotenv';
dotenv.config();
import { Admin } from '../entities/admin.entity';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AdminService } from '../admin/admin.service';
import { AppModule } from '../app.module';
import * as bcrypt from 'bcrypt';
import { Image } from '../entities/image.entity';
import { SellPoint } from '../entities/sellPoint.entity';
import * as falso from '@ngneat/falso';
import { ImageService } from '../image/image.service';
import { SellPointService } from '../sell-point/sell-point.service';
import { EventService } from '../event/event.service';
import { ParticipantService } from '../participant/participant.service';
import { Event } from '../entities/event.entity';

async function bootstrap() {
    Logger.log('Attempting to connect to the database...');
    try {
        const app = await NestFactory.createApplicationContext(AppModule);
        Logger.error(`Connected to the database successfully`);
        const adminService = app.get(AdminService);
        const participantService = app.get(ParticipantService);
        const eventService = app.get(EventService);
        const imageService = app.get(ImageService);
        const sellPointService = app.get(SellPointService);

    /*    const admin1 = new Admin();
        admin1.firstname = "cyrine";
        admin1.name = "zribi";
        admin1.cin = 11223344;
        admin1.phoneNumber = 52712485;
        admin1.email = "cyrinezribi@gmail.com";
        admin1.salt = await bcrypt.genSalt();
        admin1.password = await bcrypt.hash("cyrine123", admin1.salt);
        await adminService.create(admin1);

        const admin2 = new Admin();
        admin2.firstname = "salim";
        admin2.name = "ben omrane";
        admin2.cin = 55667788;
        admin2.phoneNumber = 51181080;
        admin2.email = "salimbenomrane@gmail.com";
        admin2.salt = await bcrypt.genSalt();
        admin2.password = await bcrypt.hash("salim123", admin2.salt);
        await adminService.create(admin2);

      /*  const sellPoints = [];
        for (let i = 0; i < 10; i++) {
            const sellPoint = new SellPoint();
            sellPoint.name = falso.randCompanyName();
            sellPoint.address = falso.randFullAddress();
            sellPoint.phoneNumber = falso.randNumber({ min: 10000000, max: 99999999 });
            const newSellPoint = await sellPointService.create(sellPoint);
            sellPoints.push(newSellPoint);
        }*/

        const images = await imageService.findAll();
        const sellPoints = await sellPointService.findAll();

        const creators = await participantService.findAll();
        const creatorIds = creators.map(creator => creator.id);

        const events = [];
        const ageRules = ['+18', '12 ans et plus', 'Tout public'];
        const dressCode = ['Décontracté', 'Créatif', 'Vintage', 'Cocktail'];

        for (let i = 0; i < 16; i++) {
            const event = new Event();
            event.name = falso.randWord();
            event.type = falso.randMusicGenre();
            event.lineUp = falso.randSinger();
            event.address = falso.randStreetAddress();
            event.capacity = falso.randNumber({ min: 50, max: 500 });
            event.alcoholRules = falso.randBoolean();
            event.ageRules = ageRules[Math.floor(Math.random() * 3)];
            event.dressCode = dressCode[Math.floor(Math.random() * 4)];
            event.ticketPrice = falso.randNumber({ min: 40, max: 120 });
            event.eventDate = falso.randSoonDate().toISOString();
            event.sellPoint = sellPoints[Math.floor(Math.random() * sellPoints.length)];
            event.image = images[i];
            const creatorId = creatorIds[Math.floor(Math.random() * creatorIds.length)];

            try {
                const newEvent = await eventService.create(event, creatorId);
                events.push(newEvent);
            } catch (error) {
                Logger.error(`Error creating event: ${error.message}`);
            }
        }

        await app.close();
    } catch (error) {
        Logger.error(`Error during database connection or seed operations: ${error.message}`);
    }
}
bootstrap();