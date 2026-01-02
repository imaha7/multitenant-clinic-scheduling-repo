import { BadRequestException, Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';

@Controller('api')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get('/availability')
  getAvailability(
    @Query('service_id') serviceId: string,
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Query('doctor_id') doctorId: string,
    @Headers('x-tenant-id') tenantId: string,
  ) {

    if (!from || !to) {
      throw new BadRequestException('from and to query params are required');
    }

    return this.availabilityService.getAvailability({
      serviceId: serviceId,
      from: from,
      to: to,
      tenantId: tenantId,
      doctorId: doctorId
    });
  }
  @Get(':id/doctor-appointments')
  getDoctorAppointments(
    @Param('id') id: string,
    @Query('service_id') serviceId: string,
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Headers('x-tenant-id') tenantId: string,
  ) {

    if (!from || !to) {
      throw new BadRequestException('from and to query params are required');
    }

    return this.availabilityService.getDoctorAppointments({
      serviceId: serviceId,
      from: from,
      to: to,
      tenantId: tenantId,
      doctorId: id
    });
  }
}
