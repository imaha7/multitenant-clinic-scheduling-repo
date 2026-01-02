import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Device } from './devices.entity';
import { CreateDevicesDto } from './devices.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly deviceService: DevicesService) {}
  @Get()
  findAll(): Promise<Device[]> {
    return this.deviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Device | null> {
    return this.deviceService.findOne(id);
  }

  @Post()
  create(@Body() device: CreateDevicesDto) {
    return this.deviceService.create(device);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() device: CreateDevicesDto) {
    return this.deviceService.update(id, device);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.deviceService.remove(id);
  }
}
