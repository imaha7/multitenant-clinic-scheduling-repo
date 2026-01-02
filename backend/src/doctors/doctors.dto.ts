import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID } from 'class-validator';

export class CreateDoctorsDto {
  @ApiProperty({ example: 'Dr A' })
  @IsString()
  name: string;

  @IsUUID()
  tenantId: string;

  @IsArray()
  workingDays: string[];

  @IsString()
  workingHours: string;
}
