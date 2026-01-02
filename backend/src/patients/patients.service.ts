import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patients.entity';
import { Repository } from 'typeorm';
import { CreatePatientsDto } from './patients.dto';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
      ) {}
      findAll(): Promise<Patient[]> {
        return this.patientRepository.find();
      }
      findOne(id: string): Promise<Patient|null> {
        return this.patientRepository.findOneBy({ id });
      }
      create(patient: CreatePatientsDto) {
        const newPatient = this.patientRepository.create(patient);
        return this.patientRepository.save(newPatient);
      }
      async update(id: string, patient: CreatePatientsDto) {
        await this.patientRepository.update(id, patient);
        return this.findOne(id);
      }
      async remove(id: string): Promise<void> {
        await this.patientRepository.delete(id);
      }
}
