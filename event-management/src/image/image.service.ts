import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Image } from "../entities/image.entity";
import { Repository } from "typeorm";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) { }

  async create(createImageDto: CreateImageDto): Promise<Image> {
    try {
      const image = this.imageRepository.create(createImageDto);
      return await this.imageRepository.save(image);

    } catch (error) {
      throw new BadRequestException('Unable to create image.');
    }
  }

  async findOne(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({ where: { id: id } });
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return image;
  }

  async findAll(): Promise<Image[]> {
    return await this.imageRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.imageRepository.delete(id);
  }

}
