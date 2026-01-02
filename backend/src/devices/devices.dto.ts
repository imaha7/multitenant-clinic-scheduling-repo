import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateDevicesDto {
  @ApiProperty({ example: 'Device A' })
  @IsString()
  name: string;

  @IsUUID()
  tenantId: string;
}
