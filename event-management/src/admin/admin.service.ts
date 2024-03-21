import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { InfoDto } from '../dto/info.dto';
import { Role } from '../enum/role.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>
  ) { }

  async create(infoDto: InfoDto): Promise<Admin> {
    const person = this.adminRepository.create({
      ...infoDto,
      role: Role.ADMIN 
  });
    return await this.adminRepository.save(person);
  }
}
