import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Tenant } from '../tenants/tenants.entity';
import { Appointment } from 'src/appointments/appointments.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @ManyToOne(() => Tenant, tenant => tenant.patients, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
}
