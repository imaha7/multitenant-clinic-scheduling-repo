import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './devices.entity';
import { Repository } from 'typeorm';
import { CreateDevicesDto } from './devices.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}
  findAll(): Promise<Device[]> {
    return this.deviceRepository.find();
  }
  findOne(id: string): Promise<Device | null> {
    return this.deviceRepository.findOneBy({ id });
  }
  create(device: CreateDevicesDto) {
    const newPatient = this.deviceRepository.create(device);
    return this.deviceRepository.save(newPatient);
  }
  async update(id: string, device: CreateDevicesDto) {
    await this.deviceRepository.update(id, device);
    return this.findOne(id);
  }
  async remove(id: string): Promise<void> {
    await this.deviceRepository.delete(id);
  }
}
