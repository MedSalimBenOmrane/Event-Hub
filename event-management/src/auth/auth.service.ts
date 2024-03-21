import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { ParticipantSubscribeDto } from "./dto/participant-subscribe.dto";
import { ConfigService } from "@nestjs/config";
import { Participant } from "../entities/participant.entity";
import { Admin } from "../entities/admin.entity";
import { Role } from "../enum/role.enum";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";


@Injectable()
export class AuthService {
  private jwtSecret: string;
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,

    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    private jwtService: JwtService,
    private configService: ConfigService,

  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  async signUp(participantSubscribeDto: ParticipantSubscribeDto): Promise<Participant> {
    const email = participantSubscribeDto.email;

    const existingParticipant = await this.participantRepository.findOne({ where: { email } });

    if (existingParticipant) {
      throw new ConflictException('A person with this email already exists.');
    }

    const newParticipant = this.participantRepository.create({
      ...participantSubscribeDto,
      role: Role.PARTICIPANT
    });
    newParticipant.salt = await bcrypt.genSalt();
    newParticipant.password = await bcrypt.hash(newParticipant.password, newParticipant.salt);
    await this.participantRepository.save(newParticipant);
    delete newParticipant.salt;
    delete newParticipant.password;
    return newParticipant;
  }

  async login(credentials: LoginCredentialsDto, userRepository: Repository<Participant | Admin>) {
    if (!credentials || !credentials.email || !credentials.password) {
      throw new BadRequestException('Invalid credentials provided.');
    }

    const { email, password } = credentials;
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Email or password incorrect.');
    }

    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (user.password === hashedPassword) {
      const payload = {
        name: user.name,
        firstname: user.firstname,
        email: user.email,
        role: user.role
      };

      const jwt = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      });

      return { "access_token": jwt };
    } else {
      throw new NotFoundException('Email or password incorrect.');
    }
  }

  async loginParticipant(credentials: LoginCredentialsDto) {
    return this.login(credentials, this.participantRepository)
  }
  async loginAdmin(credentials: LoginCredentialsDto) {
    return this.login(credentials, this.adminRepository)
  }


}