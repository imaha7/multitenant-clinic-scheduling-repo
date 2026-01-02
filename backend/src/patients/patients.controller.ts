import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './patients.entity';
import { CreatePatientsDto } from './patients.dto';

@Controller('patients')
export class PatientsController {
    constructor(private readonly patientService: PatientsService) {}
      @Get()
      findAll(): Promise<Patient[]> {
        return this.patientService.findAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id: string): Promise<Patient|null> {
        return this.patientService.findOne(id);
      }
    
      @Post()
      create(@Body() patient: CreatePatientsDto) {
        return this.patientService.create(patient);
      }
    
      @Put(':id')
      update(@Param('id') id: string, @Body() patient: CreatePatientsDto) {
        return this.patientService.update(id, patient);
      }
    
      @Delete(':id')
      remove(@Param('id') id: string): Promise<void> {
        return this.patientService.remove(id);
      }
}
