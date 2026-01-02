import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateRoomsDto {
  @ApiProperty({ example: 'Room A' })
  @IsString()
  name: string;

  @IsUUID()
  tenantId: string;
}
