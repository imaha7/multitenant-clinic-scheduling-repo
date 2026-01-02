import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Tenant } from '../tenants/tenants.entity';
import { Appointment } from '../appointments/appointments.entity';
import { Availability } from 'src/availability/availability.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.devices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @OneToMany(() => Appointment, (appointment) => appointment.device)
  appointments: Appointment[];

  // @ManyToMany(() => Availability, (slot) => slot.devices)
  // slots: Availability[];
}
