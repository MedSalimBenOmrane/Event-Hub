import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Participant } from '../entities/participant.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/passport-jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Participant])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, ConfigService, JwtStrategy],
})
export class AuthModule { }
