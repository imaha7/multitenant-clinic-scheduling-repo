import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './services.entity';
import { CreateServicesDto } from './services.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly serviceService: ServicesService) {}
  @Get()
  findAll(): Promise<Service[]> {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Service | null> {
    return this.serviceService.findOne(id);
  }

  @Post()
  create(@Body() service: CreateServicesDto) {
    return this.serviceService.create(service);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() service: CreateServicesDto) {
    return this.serviceService.update(id, service);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.serviceService.remove(id);
  }
}
