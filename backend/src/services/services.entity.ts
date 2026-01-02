import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Tenant } from '../tenants/tenants.entity';
import { Doctor } from '../doctors/doctors.entity';
import { Appointment } from 'src/appointments/appointments.entity';
import { Availability } from 'src/availability/availability.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  durationMin: number;

  @Column()
  bufferBeforeMin: number;

  @Column()
  bufferAfterMin: number;

  @Column()
  requiresRoom: boolean;

  @Column()
  requiresDevice: boolean;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'doctor_id' })
  doctorId: string;

  @ManyToOne(() => Tenant, tenant => tenant.services, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @ManyToOne(() => Doctor, doctor => doctor.services, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[];

  // @OneToMany(() => Availability, (slot) => slot.service)
  // slots: Availability[];
}
