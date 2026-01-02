import { Module } from '@nestjs/common';
import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './availability.entity';
import { Doctor } from 'src/doctors/doctors.entity';
import { Room } from 'src/rooms/rooms.entity';
import { Device } from 'src/devices/devices.entity';
import { Service } from 'src/services/services.entity';
import { Tenant } from 'src/tenants/tenants.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Availability,
      Doctor,
      Room,
      Device,
      Service,
      Tenant,
    ]),
  ],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
})
export class AvailabilityModule {}
