import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PayloadInterface } from "../interfaces/payload.interface";
import { Role } from "../../enum/role.enum";
import { Participant } from "../../entities/participant.entity";
import { Admin } from "../../entities/admin.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate(payload: PayloadInterface) {
        let user;
        if (payload.role === Role.PARTICIPANT || payload.role === Role.CREATOR) {
            user = await this.participantRepository.findOne({ where: { email: payload.email } });
        } else {
            user = await this.adminRepository.findOne({ where: { email: payload.email } });
        }

        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            id: user.id,
            name: user.name,
            firstname: user.firstname,
            email: user.email,
            role: user.role
        };
    }
}