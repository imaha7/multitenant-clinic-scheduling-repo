import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointments.entity';
import { CreateAppointmentsDto } from './appointments.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}
  @Get()
  findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Appointment | null> {
    return this.appointmentService.findOne(id);
  }

  @Get('/findByDoctor/:id')
  findByDoctor(@Param('id') doctorId: string) {
    return this.appointmentService.findByDoctor(doctorId);
  }

  @Post()
  create(@Body() appointment: CreateAppointmentsDto) {
    return this.appointmentService.create(appointment);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() appointment: CreateAppointmentsDto) {
    return this.appointmentService.update(id, appointment);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.appointmentService.remove(id);
  }
}
