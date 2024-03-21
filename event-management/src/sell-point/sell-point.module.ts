import { Module } from '@nestjs/common';
import { SellPointService } from './sell-point.service';
import { SellPointController } from './sell-point.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellPoint } from '../entities/sellPoint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SellPoint])],
  controllers: [SellPointController],
  providers: [SellPointService],
})
export class SellPointModule { }
