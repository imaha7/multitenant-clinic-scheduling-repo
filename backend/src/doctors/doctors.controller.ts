import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Doctor } from './doctors.entity';
import { CreateDoctorsDto } from './doctors.dto';

@Controller('doctors')
export class DoctorsController {
constructor(private readonly doctorService: DoctorsService) {}
  @Get()
  findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Doctor|null> {
    return this.doctorService.findOne(id);
  }

  @Post()
  create(@Body() doctor: CreateDoctorsDto) {
    return this.doctorService.create(doctor);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() doctor: CreateDoctorsDto) {
    return this.doctorService.update(id, doctor);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.doctorService.remove(id);
  }
}