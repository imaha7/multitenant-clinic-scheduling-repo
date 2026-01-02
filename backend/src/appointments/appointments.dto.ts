import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentsDto {
  @ApiProperty({ example: 'Appointment A' })
  @IsString()
  name: string;

  @IsDateString()
  startsAt: Date;

  @IsDateString()
  endsAt: Date;

  @IsUUID()
  tenantId: string;

  @IsUUID()
  doctorId: string;

  @IsUUID()
  patientId: string;

  @IsUUID()
  serviceId: string;

  @IsUUID()
  roomId: string;

  @IsUUID()
  deviceId: string;
}
