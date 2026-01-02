import { Device } from 'src/devices/devices.entity';
import { Doctor } from 'src/doctors/doctors.entity';
import { Room } from 'src/rooms/rooms.entity';
import { Service } from 'src/services/services.entity';
import { Tenant } from 'src/tenants/tenants.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('availability')
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  start: Date;

  @Column({ type: 'timestamptz' })
  end: Date;

  // @ManyToOne(() => Doctor, (doctor) => doctor.slots)
  // @JoinColumn({ name: 'doctor_id' })
  // doctor: Doctor;

  // @ManyToOne(() => Room, (room) => room.slots)
  // @JoinColumn({ name: 'room_id' })
  // room: Room;

  // @ManyToOne(() => Service, (service) => service.slots)
  // @JoinColumn({ name: 'service_id' })
  // service: Service;

  // // 🔴 INI WAJIB ADA
  // @ManyToMany(() => Device, (device) => device.slots)
  // @JoinTable({
  //   name: 'availability_slot_devices',
  //   joinColumn: {
  //     name: 'slot_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'device_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // devices: Device[];

  // @ManyToOne(() => Tenant)
  // @JoinColumn({ name: 'tenant_id' })
  // tenant: Tenant;
}

