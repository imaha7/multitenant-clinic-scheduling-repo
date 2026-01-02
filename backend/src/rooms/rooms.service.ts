import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './rooms.entity';
import { Repository } from 'typeorm';
import { CreateRoomsDto } from './rooms.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}
  findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }
  findOne(id: string): Promise<Room | null> {
    return this.roomRepository.findOneBy({ id });
  }
  create(room: CreateRoomsDto) {
    const newPatient = this.roomRepository.create(room);
    return this.roomRepository.save(newPatient);
  }
  async update(id: string, room: CreateRoomsDto) {
    await this.roomRepository.update(id, room);
    return this.findOne(id);
  }
  async remove(id: string): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
