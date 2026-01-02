import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePatientsDto {
  @ApiProperty({ example: 'Patient A' })
  @IsString()
  name: string;

  @IsUUID()
  tenantId: string;
}
