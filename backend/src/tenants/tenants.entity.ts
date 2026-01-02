import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Doctor } from '../doctors/doctors.entity';
import { Patient } from 'src/patients/patients.entity';
import { Room } from 'src/rooms/rooms.entity';
import { Device } from 'src/devices/devices.entity';
import { Appointment } from 'src/appointments/appointments.entity';
import { Service } from 'src/services/services.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @OneToMany(() => Doctor, doctor => doctor.tenant)
  doctors: Doctor[];

  @OneToMany(() => Patient, patient => patient.tenant)
  patients: Patient[];

  @OneToMany(() => Service, service => service.tenant)
  services: Service[];

  @OneToMany(() => Room, room => room.tenant)
  rooms: Room[];

  @OneToMany(() => Device, device => device.tenant)
  devices: Device[];

  @OneToMany(() => Appointment, appointment => appointment.tenant)
  appointments: Appointment[];
}