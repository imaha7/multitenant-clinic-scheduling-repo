import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class GetAvailabilityDto {
  @ApiProperty({ example: 'uuid-xxx' })
  @IsOptional()
  serviceId: string;

  @IsDateString()
  from: Date;

  @IsDateString()
  to: Date;

  @IsString()
  @IsOptional()
  doctorId: string;

  @IsString()
  tenantId: string;
}
