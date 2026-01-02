import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantsDto {
  @ApiProperty({ example: 'Tenant A' })
  @IsString()
  name: string;
}