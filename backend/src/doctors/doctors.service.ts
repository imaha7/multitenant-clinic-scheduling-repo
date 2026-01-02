import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctors.entity';
import { Repository } from 'typeorm';
import { CreateDoctorsDto } from './doctors.dto';

@Injectable()
export class DoctorsService {
    constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}
  findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }
  findOne(id: string): Promise<Doctor|null> {
    return this.doctorRepository.findOneBy({ id });
  }
  create(doctor: CreateDoctorsDto) {
    const newDoctor = this.doctorRepository.create(doctor);
    return this.doctorRepository.save(newDoctor);
  }
  async update(id: string, doctor: CreateDoctorsDto) {
    await this.doctorRepository.update(id, doctor);
    return this.findOne(id);
  }
  async remove(id: string): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}
