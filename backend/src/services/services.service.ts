import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './services.entity';
import { CreateServicesDto } from './services.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}
  findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }
  findOne(id: string): Promise<Service | null> {
    return this.serviceRepository.findOneBy({ id });
  }
  create(service: CreateServicesDto) {
    const newService = this.serviceRepository.create(service);
    return this.serviceRepository.save(newService);
  }
  async update(id: string, service: CreateServicesDto) {
    await this.serviceRepository.update(id, service);
    return this.findOne(id);
  }
  async remove(id: string): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}
