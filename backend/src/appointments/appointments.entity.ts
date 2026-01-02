import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../tenants/tenants.entity';
import { Doctor } from '../doctors/doctors.entity';
import { Patient } from 'src/patients/patients.entity';
import { Service } from 'src/services/services.entity';
import { Room } from 'src/rooms/rooms.entity';
import { Device } from 'src/devices/devices.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  startsAt: Date;

  @Column({ default: null })
  endsAt: Date;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @ManyToOne(() => Tenant, tenant => tenant.appointments, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'doctor_id' })
  doctorId: string;

  @ManyToOne(() => Doctor, doctor => doctor.appointments, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column({ name: 'patient_id' })
  patientId: string;

  @ManyToOne(() => Patient, patient => patient.appointments, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column({ name: 'service_id' })
  serviceId: string;

  @ManyToOne(() => Service, service => service.appointments, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ name: 'room_id' })
  roomId: string;

  @ManyToOne(() => Room, room => room.appointments, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column({ name: 'device_id' })
  deviceId: string;

  @ManyToOne(() => Device, device => device.appointments, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'device_id' })
  device: Device;
}
