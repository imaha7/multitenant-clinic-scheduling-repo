import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateServicesDto {
  @ApiProperty({ example: 'Service A' })
  @IsString()
  name: string;

  @IsNumber()
  durationMin: number;

  @IsNumber()
  bufferBeforeMin: number;

  @IsNumber()
  bufferAfterMin: number;

  @IsBoolean()
  requiresRoom: boolean;

  @IsBoolean()
  requiresDevice: boolean;

  @IsUUID()
  tenantId: string;

  @IsUUID()
  doctorId: string;
}
