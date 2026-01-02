import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAvailabilityDto } from './availability.dto';
import { Doctor } from 'src/doctors/doctors.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  private availabilityResponse(slots: Doctor[]) {
    return slots.map((slot) => ({
      tenant_id: slot.tenantId,
      tenant_name: slot.tenant?.name,
      doctor_id: slot.id,
      doctor_name: slot.name,
      service_id: slot.services?.[0]?.id,
      service_duration: slot.services?.[0]?.durationMin,
      service_buffer_before: slot.services?.[0]?.bufferBeforeMin,
      service_buffer_after: slot.services?.[0]?.bufferAfterMin,
      status: 'available',
      doctor_working_hours: slot.workingHours,
      start: slot.appointments?.[slot.appointments.length - 1]?.startsAt || null,
      end: slot.appointments?.[slot.appointments.length - 1]?.endsAt || null,
    }));
  }

  private doctorAppointmentsResponse(appointments: Doctor[]) {
    return appointments.map((appointment) => ({
      doctor_id: appointment.id,
      tenant_id: appointment.tenantId,
      tenant_name: appointment.tenant?.name,
      doctor_name: appointment.name,
      services: appointment.services,
      appointments: appointment.appointments,
    }));
  }

  async getAvailability(dto: GetAvailabilityDto) {
    const { serviceId, from, to, tenantId } = dto;
    const fromDate = new Date(from.toString().replace(' ', '+'));
    const toDate = new Date(to.toString().replace(' ', '+'));
    const currentDate = new Date().toString().replace(' ', '+');
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const fromHours = String(fromDate.getUTCHours()).padStart(2, '0');
    const fromMinutes = String(fromDate.getUTCMinutes()).padStart(2, '0');
    const toHours = String(toDate.getUTCHours()).padStart(2, '0');
    const toMinutes = String(toDate.getUTCMinutes()).padStart(2, '0');
    const formattedWorkingHours = `${fromHours}:${fromMinutes} - ${toHours}:${toMinutes}`;
    const formattedWorkingFromHour = `${fromHours}:${fromMinutes}`;
    const formattedWorkingToHour = `${toHours}:${toMinutes}`;
    const getFromDay = days[fromDate.getUTCDay()];
    const getToDay = days[toDate.getUTCDay()];

    const slotsAvailability = await this.doctorRepository
      .createQueryBuilder('doctor')
      .innerJoinAndSelect('doctor.tenant', 'tenant')
      .innerJoinAndSelect('doctor.services', 'services')
      .innerJoinAndSelect('doctor.appointments', 'appointments')
      .where('doctor.tenant_id = :tenantId', { tenantId })
      .andWhere('services.id = :serviceId', { serviceId })
      .andWhere(':getFromDay = ANY(doctor.workingDays)', {
        getFromDay: getFromDay,
      })
      .andWhere(':getToDay = ANY(doctor.workingDays)', { getToDay: getToDay })
      .andWhere('split_part(doctor.workingHours, \' - \', 2)::time > :formattedWorkingFromHour AND split_part(doctor.workingHours, \' - \', 1)::time < :formattedWorkingToHour', {
        formattedWorkingFromHour,
        formattedWorkingToHour
      })
      .andWhere(
        `:to > appointments.endsAt`,
        { to: toDate },
      )
      // .andWhere(
      //   `:currentDate > appointments.endsAt + (services.bufferAfterMin || ' minutes')::interval`,
      //   { currentDate }
      // )
      .limit(3)
      .getMany();

    return {
      slots: this.availabilityResponse(slotsAvailability),
      limit: 3,
    };
  }

  async getDoctorAppointments(dto: GetAvailabilityDto) {
    const { serviceId, from, to, tenantId, doctorId } = dto;

    const fromDate = new Date(from.toString().replace(' ', '+'));
    const toDate = new Date(to.toString().replace(' ', '+'));

    const doctorAppointments = await this.doctorRepository
      .createQueryBuilder('doctor')
      .innerJoinAndSelect('doctor.tenant', 'tenant')
      .innerJoinAndSelect('doctor.services', 'services')
      .innerJoinAndSelect('doctor.appointments', 'appointments')
      .where('doctor.id = :id', { id: doctorId })
      .andWhere('appointments.serviceId = :serviceId', { serviceId: serviceId })
      .andWhere('doctor.tenant_id = :tenantId', { tenantId })
      .andWhere('appointments.startsAt >= :from', { from: fromDate })
      .andWhere('appointments.endsAt <= :to', { to: toDate })
      .getMany();

    return this.doctorAppointmentsResponse(doctorAppointments);
  }
}
