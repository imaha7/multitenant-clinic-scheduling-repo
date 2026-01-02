import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './tenants.entity';
import { Repository } from 'typeorm';
import { CreateTenantsDto } from './tenants.dto';

@Injectable()
export class TenantsService {
    constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}
  findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }
  findOne(id: string): Promise<Tenant|null> {
    return this.tenantRepository.findOneBy({ id });
  }
  create(tenant: CreateTenantsDto)  {
    const newtenant = this.tenantRepository.create(tenant);
    return this.tenantRepository.save(newtenant);
  }
  async update(id: string, tenant: CreateTenantsDto) {
    await this.tenantRepository.update(id, tenant);
    return this.findOne(id);
  }
  async remove(id: string): Promise<void> {
    await this.tenantRepository.delete(id);
  }
}
