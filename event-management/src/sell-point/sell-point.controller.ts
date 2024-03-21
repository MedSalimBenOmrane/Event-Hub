import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SellPointService } from './sell-point.service';
import { CreateSellPointDto } from './dto/create-sell-point.dto';
import { UpdateSellPointDto } from './dto/update-sell-point.dto';

@Controller('sell-point')
export class SellPointController {
  constructor(private readonly sellPointService: SellPointService) { }

  @Post()
  create(@Body() createSellPointDto: CreateSellPointDto) {
    return this.sellPointService.create(createSellPointDto);
  }

  @Get()
  findAll() {
    return this.sellPointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellPointService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellPointDto: UpdateSellPointDto) {
    return this.sellPointService.update(+id, updateSellPointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellPointService.remove(+id);
  }
}
