import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Tenant } from '../tenants/tenants.entity';
import { Service } from 'src/services/services.entity';
import { Appointment } from 'src/appointments/appointments.entity';
import { Availability } from 'src/availability/availability.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('varchar', { array: true, default: [] })
  workingDays: string[];

  @Column('varchar', { default: null })
  workingHours: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.doctors, {
    onDelete: 'CASCADE',
  })
  
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @OneToMany(() => Service, (service) => service.doctor)
  services: Service[];

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  // @OneToMany(() => Availability, (slot) => slot.doctor)
  // slots: Availability[];
}
