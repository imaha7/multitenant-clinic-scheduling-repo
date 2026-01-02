import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointments.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentsDto } from './appointments.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}
  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }
  findOne(id: string): Promise<Appointment | null> {
    return this.appointmentRepository.findOneBy({ id });
  }
  findByDoctor(doctorId: string) {
    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .where('doctor.id = :doctorId', { doctorId })
      // .andWhere('appointment.appointmentDate = :date', { date })
      .getMany();
  }
  create(appointment: CreateAppointmentsDto) {
    const newAppointment = this.appointmentRepository.create(appointment);
    return this.appointmentRepository.save(newAppointment);
  }
  async update(id: string, appointment: CreateAppointmentsDto) {
    await this.appointmentRepository.update(id, appointment);
    return this.findOne(id);
  }
  async remove(id: string): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}
