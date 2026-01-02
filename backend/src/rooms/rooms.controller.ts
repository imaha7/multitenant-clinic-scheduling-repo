import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './rooms.entity';
import { CreateRoomsDto } from './rooms.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}
  @Get()
  findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Room | null> {
    return this.roomService.findOne(id);
  }

  @Post()
  create(@Body() room: CreateRoomsDto) {
    return this.roomService.create(room);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() room: CreateRoomsDto) {
    return this.roomService.update(id, room);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.roomService.remove(id);
  }
}
