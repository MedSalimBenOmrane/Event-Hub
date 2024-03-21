import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SellPoint } from "../entities/sellPoint.entity";
import { CreateSellPointDto } from "./dto/create-sell-point.dto";
import { UpdateSellPointDto } from "./dto/update-sell-point.dto";


@Injectable()
export class SellPointService {
  constructor(
    @InjectRepository(SellPoint)
    private readonly sellPointRepository: Repository<SellPoint>,
  ) { }

  async create(createSellPointDto: CreateSellPointDto): Promise<SellPoint> {
    const sellPoint = this.sellPointRepository.create(createSellPointDto);
    return await this.sellPointRepository.save(sellPoint);
  }

  async findAll(): Promise<SellPoint[]> {
    return await this.sellPointRepository.find();
  }

  async findOne(id: number): Promise<SellPoint> {
    const sellPoint = await this.sellPointRepository.findOne({ where: { id: id } });
    if (!sellPoint) {
      throw new NotFoundException(`Sell Point with ID ${id} not found`);
    }
    return sellPoint;
  }

  async update(id: number, updateSellPointDto: UpdateSellPointDto): Promise<SellPoint> {
    this.sellPointRepository.update(id, updateSellPointDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.sellPointRepository.delete(id);
  }
}
