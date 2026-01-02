import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Tenant } from '../tenants/tenants.entity';
import { Appointment } from 'src/appointments/appointments.entity';
import { Availability } from 'src/availability/availability.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.rooms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @OneToMany(() => Appointment, (appointment) => appointment.room)
  appointments: Appointment[];

  // @OneToMany(() => Availability, (slot) => slot.room)
  // slots: Availability[];
}
